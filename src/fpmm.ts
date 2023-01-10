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
    calcBuyAmount: (amountInvest: BigNumberish, outcomeIndex: number) => Promise<BigNumber>;

    calcSellAmount: (amountReturn: BigNumberish, outcomeIndex: number) => Promise<BigNumber>;

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

    addLiquidity: (amount: BigNumberish, from: string) => Promise<ContractTransaction>;

    removeLiquidity: (amountLP: BigNumberish, from: string) => Promise<ContractTransaction>;

    /* FEE METHODS */
    getWithdrawableFeeAmount: (account: string) => Promise<BigNumber>;

    withdrawFeeAmount: (from: string) => Promise<ContractTransaction>;
}
