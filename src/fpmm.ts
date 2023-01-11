import { BigNumber, BigNumberish, ethers, Signer, ContractTransaction } from "ethers";
import { BigNumber as BN } from "bignumber.js";
import { ConditionalTokensRepo } from "./conditionalTokens";
import {
    ERC20,
    ERC20__factory,
    FixedProductMarketMaker,
    FixedProductMarketMakerFactory,
    FixedProductMarketMaker__factory,
    FixedProductMarketMakerFactory__factory,
} from "./contracts";

export interface MarketMakerFactoryRepoInterface {
    createFPMarketMaker: (
        collateralAddress: string,
        conditionalTokensAddress: string,
        conditionId: string,
        fee: BigNumberish
    ) => Promise<string>;
}

export class MarketMakerFactoryRepo implements MarketMakerFactoryRepoInterface {
    private _contract: FixedProductMarketMakerFactory;

    constructor(signer: Signer, marketMakerFactoryAddress: string) {
        this._contract = FixedProductMarketMakerFactory__factory.connect(
            marketMakerFactoryAddress,
            signer
        );
        if (!this._contract.address) {
            throw new Error("Error connecting to FixedProductMarketMakerFactory contract.");
        }
    }

    createFPMarketMaker = async (
        collateralAddress: string,
        conditionalTokensAddress: string,
        conditionId: string,
        fee: BigNumberish
    ): Promise<string> => {
        const tx = await (
            await this._contract.createFixedProductMarketMaker(
                conditionalTokensAddress,
                collateralAddress,
                [conditionId],
                fee
            )
        ).wait(1);

        let deployedMarketAddress: string | undefined = undefined;

        tx.events &&
            tx.events.map((event) => {
                if (event.event == "FixedProductMarketMakerCreation" && event.args !== undefined) {
                    deployedMarketAddress = event.args["fixedProductMarketMaker"];
                }
            });

        if (deployedMarketAddress !== undefined) {
            return deployedMarketAddress;
        } else {
            console.error(JSON.stringify(tx, null, 2));
            throw new Error(
                "No FixedProductMarketMakerCreation Event fired. Please check the TX above"
            );
        }
    };
}

export interface MarketMakerRepoInterface {
    readonly contractAddress: string;
    readonly conditionalTokensAddress: string;
    readonly collateralAddress: string;

    /* TOKEN METHODS */
    getCollateralBalance: (account: string) => Promise<BigNumber>;

    getCollateralApproval: (account: string) => Promise<BigNumber>;

    setCollateralApproval: (amount: BigNumberish, from: string) => Promise<ContractTransaction>;

    getLPTokenBalance: (account: string) => Promise<BigNumber>;

    getLPTokenApproval: (account: string) => Promise<BigNumber>;

    setLPTokenApproval: (amount: BigNumberish, from: string) => Promise<ethers.ContractTransaction>;

    getConditionalTokenBalance: (account: string, positionId: string) => Promise<BigNumber>;

    getConditionalTokenApproval: (account: string) => Promise<boolean>;

    setConditionalTokenApproval: (approved: boolean, from: string) => Promise<ContractTransaction>;

    /* MARKET METHODS */
    //[LEM] convert to local calculation
    calcBuyTokens: (amountInvest: BigNumberish, outcomeIndex: number) => Promise<BigNumber>;

    calcSellTokens: (amountReturn: BigNumberish, outcomeIndex: number) => Promise<BigNumber>;

    // calcBuyAmount: (tokenAmountBuy: BigNumberish, outcomeIndex: number) => Promise<BigNumber>;

    // calcSellAmount: (tokenAmountSell: BigNumberish, outcomeIndex: number) => Promise<BigNumber>;

    buy: (
        amountInvest: BigNumberish,
        outcomeIndex: number,
        minOutcomeTokensToBuy: BigNumberish,
        from: string
    ) => Promise<ContractTransaction>;

    sell: (
        amountReturn: BigNumberish,
        outcomeIndex: number,
        maxOutcomeTokensToSell: BigNumberish,
        from: string
    ) => Promise<ContractTransaction>;

    // addLiquidity: (amount: BigNumberish, from: string) => Promise<ContractTransaction>;

    // removeLiquidity: (amountLP: BigNumberish, from: string) => Promise<ContractTransaction>;

    /* FEE METHODS */
    // getWithdrawableFeeAmount: (account: string) => Promise<BigNumber>;

    // withdrawFeeAmount: (from: string) => Promise<ContractTransaction>;
}

export class MarketMakerRepo implements MarketMakerRepoInterface {
    /* PRIVATE PROPERTIES */
    private _contract: FixedProductMarketMaker;
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

        this._contract = FixedProductMarketMaker__factory.connect(marketMakerAddress, signer);
        this._collateral = ERC20__factory.connect(collateralAddress, signer);

        if (!this._contract.address || !this._collateral.address) {
            throw new Error(
                `Error connecting to contracts. \n\
                 FPMM: ${this._contract.address} \n\
                 Collateral: ${this._collateral.address}`
            );
        }
    }

    /* TOKEN METHODS */
    getCollateralBalance = async (account: string): Promise<BigNumber> => {
        return this._collateral.balanceOf(account);
    };

    getCollateralApproval = async (account: string): Promise<BigNumber> => {
        return this._collateral.allowance(account, this.contractAddress);
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

    getLPTokenBalance = async (account: string): Promise<BigNumber> => {
        return this._contract.balanceOf(account);
    };

    getLPTokenApproval = async (account: string): Promise<BigNumber> => {
        return this._contract.allowance(account, this.contractAddress);
    };

    setLPTokenApproval = async (
        amount: BigNumberish,
        from: string
    ): Promise<ethers.ContractTransaction> => {
        return this._contract.approve(this.contractAddress, amount, {
            from,
            gasLimit: ethers.BigNumber.from(1e6), //[LEM] gasLimit
        });
    };

    getConditionalTokenBalance = async (account: string, positionId: string): Promise<BigNumber> => {
        return this._conditionalTokens.getBalance(account, positionId);
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

    /* MARKET METHODS */
    calcBuyTokens = async (amountInvest: BigNumberish, outcomeIndex: number): Promise<BigNumber> => {
        return this._contract.calcBuyAmount(amountInvest, outcomeIndex);
    };

    calcSellTokens = async (amountReturn: BigNumberish, outcomeIndex: number): Promise<BigNumber> => {
        return this._contract.calcSellAmount(amountReturn, outcomeIndex);
    };

    buy = async (
        amountInvest: BigNumberish,
        outcomeIndex: number,
        minOutcomeTokensToBuy: BigNumberish,
        from: string
    ): Promise<ContractTransaction> => {
        return this._contract.buy(amountInvest, outcomeIndex, minOutcomeTokensToBuy, { from });
    };

    sell = async (
        amountReturn: BigNumberish,
        outcomeIndex: number,
        maxOutcomeTokensToSell: BigNumberish,
        from: string
    ): Promise<ContractTransaction> => {
        return this._contract.sell(amountReturn, outcomeIndex, maxOutcomeTokensToSell, { from });
    };

    /* FEE METHODS */

    /**
     * Safely initializes the MarketMakerRepo class checking if the collateralAddress mentioned
     * is the same collateral used by the market.
     * @param signer Signer to use to deploy market
     * @param marketMakerAddress Address of the deployed FPMarketMaker contract
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
        const contractCollateralAddress = await FixedProductMarketMaker__factory.connect(
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