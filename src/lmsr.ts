import { BigNumber, BigNumberish, ethers, Signer } from "ethers";
import { BigNumber as BN } from "bignumber.js";
import { ConditionalTokensRepo } from "./conditionalTokens";
import {
    ERC20,
    ERC20__factory,
    LMSRMarketMaker,
    LMSRMarketMakerFactory,
    LMSRMarketMakerFactory__factory,
    LMSRMarketMaker__factory,
} from "./contracts";

export interface MarketMakerFactoryRepoInterface {
    createLMSRMarketMaker: (
        collateralAddress: string,
        conditionalTokensAddress: string,
        conditionId: string,
        fee: BigNumberish,
        funding: BigNumberish
    ) => Promise<string>;
}

export class MarketMakerFactoryRepo implements MarketMakerFactoryRepoInterface {
    private _contract: LMSRMarketMakerFactory;

    constructor(signer: Signer, marketMakerFactoryAddress: string) {
        this._contract = LMSRMarketMakerFactory__factory.connect(marketMakerFactoryAddress, signer);
        if (!this._contract.address) {
            throw new Error("Error connecting to LMSRMarketMakerFactory contract.");
        }
    }

    createLMSRMarketMaker = async (
        collateralAddress: string,
        conditionalTokensAddress: string,
        conditionId: string,
        fee: BigNumberish,
        funding: BigNumberish
    ): Promise<string> => {
        const tx = await (
            await this._contract.createLMSRMarketMaker(
                conditionalTokensAddress,
                collateralAddress,
                [conditionId],
                fee,
                ethers.constants.AddressZero,
                funding,
                {
                    gasLimit: BigNumber.from(1e6),
                }
            )
        ).wait(1);

        let deployedMarketAddress: string | undefined = undefined;

        tx.events &&
            tx.events.map((event) => {
                if (event.event == "LMSRMarketMakerCreation" && event.args !== undefined) {
                    deployedMarketAddress = event.args["lmsrMarketMaker"];
                }
            });

        if (deployedMarketAddress !== undefined) {
            return deployedMarketAddress;
        } else {
            console.error(JSON.stringify(tx, null, 2));
            throw new Error(
                "No LMSRMarketMakerCreation Event fired. Please check the TX above.\nPossible causes for failure:\n- ABIs outdated. Delete the build/ folder\n- Transaction failure\n- Unfunded LMSR"
            );
        }
    };
}

export interface MarketMakerRepoInterface {
    readonly contractAddress: string;
    readonly conditionalTokensAddress: string;
    readonly collateralAddress: string;

    calcNetCostLocal?: (outcomeTokenAmounts: BigNumberish[]) => BigNumber;

    calcNetCostRemote: (outcomeTokenAmounts: BigNumberish[]) => Promise<BigNumber>;

    calcPriceLocal?: (outcomeTokenIndex: number) => number;

    calcPriceRemote: (outcomeTokenIndex: number) => Promise<[number, number]>;

    trade: (
        tokenAmounts: BigNumberish[],
        collateralLimit: BigNumberish,
        from: string
    ) => Promise<ethers.ContractTransaction>;

    getCollateralBalance: (account: string) => Promise<BigNumber>;

    setCollateralApproval: (
        amount: BigNumberish,
        from: string
    ) => Promise<ethers.ContractTransaction>;

    getConditionalTokenApproval: (account: string) => Promise<boolean>;

    setConditionalTokenApproval: (
        approved: boolean,
        from: string
    ) => Promise<ethers.ContractTransaction>;
}

export class MarketMakerRepo implements MarketMakerRepoInterface {
    /* PRIVATE PROPERTIES */
    private _contract: LMSRMarketMaker;
    private _conditionalTokens: ConditionalTokensRepo;
    private _collateral: ERC20;

    /* PUBLIC PROPERTIES */
    get contractAddress() {
        return this._contract.address;
    }
    get conditionalTokensAddress() {
        return this._conditionalTokens.address;
    }
    get collateralAddress() {
        return this._collateral.address;
    }

    constructor(
        signer: Signer,
        marketMakerAddress: string,
        conditionalTokensAddress: string,
        collateralAddress: string
    ) {
        this._conditionalTokens = new ConditionalTokensRepo(signer, conditionalTokensAddress);

        this._contract = LMSRMarketMaker__factory.connect(marketMakerAddress, signer);
        this._collateral = ERC20__factory.connect(collateralAddress, signer);

        if (!this._contract.address || !this._collateral.address) {
            throw new Error(
                `Error connecting to contracts. \n\
                 LMSRMM: ${this._contract.address} \n\
                 Collateral: ${this._collateral.address}`
            );
        }
    }

    calcNetCostRemote = async (outcomeTokenAmounts: BigNumberish[]): Promise<BigNumber> => {
        return this._contract.calcNetCost(outcomeTokenAmounts);
    };

    calcPriceRemote = async (outcomeTokenIndex: number): Promise<[number, number]> => {
        const DECIMALS = 18;
        const marginalPrice = new BN(
            (await this._contract.calcMarginalPrice(outcomeTokenIndex)).toString()
        );
        const price = marginalPrice.dividedBy(new BN(10).pow(DECIMALS));
        const probability = marginalPrice.dividedBy(new BN(2).pow(64));
        return [price.toNumber(), probability.toNumber()];
    };

    trade = async (
        tokenAmounts: BigNumberish[],
        collateralLimit: BigNumberish,
        from: string
    ): Promise<ethers.ContractTransaction> => {
        return this._contract.trade(tokenAmounts, collateralLimit, {
            from,
            gasLimit: ethers.BigNumber.from(1e6), //[LEM] gasLimit
        });
    };

    getCollateralBalance = async (account: string): Promise<BigNumber> => {
        return this._collateral.balanceOf(account);
    };

    setCollateralApproval = async (
        amount: BigNumberish,
        from: string
    ): Promise<ethers.ContractTransaction> => {
        return this._collateral.approve(this.contractAddress, amount, {
            from,
            gasLimit: ethers.BigNumber.from(1e6), //[LEM] gasLimit
        });
    };

    getConditionalTokenApproval = async (account: string): Promise<boolean> => {
        return this._conditionalTokens.getApprovalForAll(account, this.contractAddress);
    };

    setConditionalTokenApproval = async (
        approved: boolean,
        from: string
    ): Promise<ethers.ContractTransaction> => {
        return this._conditionalTokens.setApprovalForAll(this.contractAddress, approved, from);
    };

    /**
     * Safely initializes the MarketMakerRepo class checking if the collateralAddress mentioned
     * is the same collateral used by the market.
     * @param signer Signer to use to deploy market
     * @param marketMakerAddress Address of the deployed LMSRMarketMaker contract
     * @param conditionalTokensAddress Address of the deployed ConditionalTokens contract
     * @param collateralAddress Address of the collateral token contract
     * @returns MarketMakerRepo class instance
     */
    static async initialize(
        signer: Signer,
        marketMakerAddress: string,
        conditionalTokensAddress: string,
        collateralAddress: string
    ) {
        const contractCollateralAddress = await LMSRMarketMaker__factory.connect(
            marketMakerAddress,
            signer
        ).collateralToken();

        if (contractCollateralAddress !== collateralAddress) {
            throw new Error("contractCollateralAddress != collateralAddress");
        }

        return new MarketMakerRepo(
            signer,
            marketMakerAddress,
            conditionalTokensAddress,
            collateralAddress
        );
    }
}
