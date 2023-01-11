import { ethers, BigNumber, BigNumberish, Signer, utils, ContractTransaction } from "ethers";
import _ from "lodash";
import { ConditionalTokensRepo } from "./conditionalTokens";
import { MarketMakerRepo, MarketMakerFactoryRepo } from "./fpmm";
import { Outcome } from "./utils";

export interface MarketInterface {
    readonly collateralAddress: string;
    readonly conditionId: string;
    readonly questionId: string;
    readonly outcomes: Outcome[];
    readonly fee: BigNumberish;

    getUserTokenBalances: () => Promise<BigNumber[]>;

    getPoolTokenBalances: () => Promise<BigNumber[]>;

    getCurrentOdds: () => Promise<number[]>;

    /**
     * Buy a quantity of tokens
     * @param amountInvest Amount of collateral tokens to put into the market
     * @param outcomeIndex Index of outcome tokens to be bought
     * @param slippage The percent slippage acceptable
     * @returns Promise which resolves to a transaction
     */
    buy: (
        amountInvest: BigNumberish,
        outcomeIndex: number,
        slippage: number
    ) => Promise<ContractTransaction>;

    /**
     * Sell a quantity of tokens
     * @param amountReturn Amount of collateral tokens to buy back from the market
     * @param outcomeIndex Index of outcome tokens to be sold
     * @param slippage The percent slippage acceptable
     * @returns Promise which resolves to a transaction
     */
    sell: (
        amountReturn: BigNumberish,
        outcomeIndex: number,
        slippage: number
    ) => Promise<ContractTransaction>;

    // addLiquidity: (amount: number) => Promise<>;

    // removeLiquidity: (amount: number) => Promise<>;

    // priceHistory: (length: number) => Promise<>;

    // volumeHistory: (length: number) => Promise<>;
}

export class Market implements MarketInterface {
    private readonly _signer: Signer;
    private readonly _oracle: string;
    private readonly _marketMaker: MarketMakerRepo;

    readonly collateralAddress: string;
    readonly conditionId: string;
    readonly questionId: string;
    readonly outcomes: Outcome[];
    readonly fee: BigNumberish;

    constructor(
        signer: Signer,
        oracle: string,
        collateralAddress: string,
        conditionId: string,
        questionId: string,
        outcomes: Outcome[],
        fee: BigNumberish,
        marketMaker: MarketMakerRepo
    ) {
        this._signer = signer;
        this._oracle = oracle;
        this._marketMaker = marketMaker;

        this.collateralAddress = collateralAddress;
        this.conditionId = conditionId;
        this.questionId = questionId;
        this.outcomes = outcomes;
        this.fee = fee;
    }

    getUserTokenBalances = async (): Promise<BigNumber[]> => {
        const account = await this._signer.getAddress();

        const balances = [];
        for (const outcome of this.outcomes) {
            let bal = await this._marketMaker.getConditionalTokenBalance(account, outcome.positionId);
            balances.push(bal);
        }
        return balances;
    };

    getPoolTokenBalances = async (): Promise<BigNumber[]> => {
        const balances = [];
        for (const outcome of this.outcomes) {
            let bal = await this._marketMaker.getConditionalTokenBalance(
                this._marketMaker.contractAddress,
                outcome.positionId
            );
            balances.push(bal);
        }
        return balances;
    };

    getCurrentOdds = async (): Promise<number[]> => {
        const balancesRaw = await this.getPoolTokenBalances();
        const balances = balancesRaw.map((i: BigNumber) => utils.formatEther(i));

        const oddsWeight: number[] = [];
        for (let i = 0; i < balances.length; i++) {
            const bf = balances.filter((item: string, index: number) => index != i);
            const bm = bf.map((item: string) => Number(item));
            const br = bm.reduce((acc = 1, item: number) => (acc *= item));
            oddsWeight.push(br);
        }
        const oddsWeightSum = oddsWeight.reduce((acc = 0, item: number) => (acc += item));
        const odds = oddsWeight.map((item: number) => item / oddsWeightSum);
        return odds;
    };

    //[LEM] slippage not considered
    //[LEM] ensure approvals
    buy = async (
        amountInvest: BigNumberish,
        outcomeIndex: number,
        slippage: number
    ): Promise<ContractTransaction> => {
        try {
            //[LEM] Temp
            const MINTOKENS = "1";

            const account = await this._signer.getAddress();
            const collateralBalance = await this._marketMaker.getCollateralBalance(account);

            if (BigNumber.from(amountInvest).gt(collateralBalance)) {
                throw new Error("Insufficient collateral balance in account");
            } else {
                let trx1 = await this._marketMaker.setCollateralApproval(amountInvest);
                await trx1.wait();
                let trx2 = await this._marketMaker.buy(amountInvest, outcomeIndex, MINTOKENS);
                return trx2;
            }
        } catch (error) {
            throw error;
        }
    };

    sell = async (
        amountReturn: BigNumberish,
        outcomeIndex: number,
        slippage: number
    ): Promise<ContractTransaction> => {
        try {
            //[LEM] Temp
            const MAXTOKENS = "1" + "0".repeat(22);

            const account = await this._signer.getAddress();

            const outcomeTokenBalance = await this._marketMaker.getConditionalTokenBalance(
                account,
                this.outcomes[outcomeIndex].positionId
            );
            const outcomeTokensToSell = await this._marketMaker.calcSellTokens(
                amountReturn,
                outcomeIndex
            );
            //[LEM] slippage not considered (outcomeTokensToSell + slippage%OfTokens)
            if (outcomeTokensToSell.gt(outcomeTokenBalance)) {
                throw new Error("Insufficient position token balance in account");
            }
            const isApproved = await this._marketMaker.getConditionalTokenApproval(account);
            if (!isApproved) {
                let trx1 = await this._marketMaker.setConditionalTokenApproval(true);
                await trx1.wait();
            }

            let trx2 = await this._marketMaker.sell(amountReturn, outcomeIndex, MAXTOKENS);
            return trx2;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Safely initializes the Market class instance to be used by clients/traders.
     * @param signer Signer to use to deploy market
     * @param marketMakerAddress Address of the deployed LMSRMarketMaker contract
     * @param conditionalTokensAddress Address of the deployed ConditionalTokens contract
     * @param collateralAddress Address of the collateral token contract
     * @param oracle Address of the oracle to use. Defaults to address of signer
     * @param conditionId conditionId of the market
     * @param questionId questionId used to create the market
     * @param outcomes Array of outcome objects
     * @param fee fee (uint64))
     * @returns Market class instance
     */
    static async initialize(
        signer: Signer,
        marketMakerAddress: string,
        conditionalTokensAddress: string,
        collateralAddress: string,
        oracle: string,
        conditionId: string,
        questionId: string,
        outcomes: Outcome[],
        fee: BigNumberish
    ): Promise<Market> {
        const fpmmRepo: MarketMakerRepo = await MarketMakerRepo.initialize(
            signer,
            marketMakerAddress,
            conditionalTokensAddress,
            collateralAddress
        );

        return new Market(
            signer,
            oracle,
            collateralAddress,
            conditionId,
            questionId,
            outcomes,
            fee,
            fpmmRepo
        );
    }
}

export class MarketAdmin {
    //pause
    //resume
    //resolve-reportPayouts
    //withdrawFee

    /**
     * Creates a market and a market maker for the specified market details.
     * @param signer Signer to use to deploy market
     * @param collateralAddress Address of the collateral token contract
     * @param conditionalTokensAddress Address of the deployed ConditionalTokens contract
     * @param marketMakerFactoryAddress Address of the deployed LMSRMarketMakerFactory contract
     * @param oracle Address of the oracle to use. Defaults to address of signer
     * @param questionId questionId used to create the market
     * @param outcomes Array of outcome objects
     * @param fee fee (uint64)
     * @param funding initial funding provided to the market
     * @param initialOdds: initial odds for outcomes of the market
     * @returns [conditionId, lmsrmmAddress]
     */
    static async createMarket(
        signer: Signer,
        collateralAddress: string,
        conditionalTokensAddress: string,
        marketMakerFactoryAddress: string,
        oracle: string,
        questionId: string,
        outcomes: Outcome[],
        fee: BigNumberish,
        funding: BigNumberish,
        initialOdds: number[]
    ): Promise<[string, string]> {
        try {
            // init
            const ctRepo = new ConditionalTokensRepo(signer, conditionalTokensAddress);
            const fpmmFactoryRepo = new MarketMakerFactoryRepo(signer, marketMakerFactoryAddress);

            // `prepareCondition` & set up `FixedProductMarketMaker`
            const conditionId = await ctRepo.createCondition(oracle, questionId, outcomes.length);
            const fpmmAddress = await fpmmFactoryRepo.createFPMarketMaker(
                collateralAddress,
                conditionalTokensAddress,
                conditionId,
                fee
            );

            // // approve collateral and fund FixedProductMarketMaker
            const fpmmRepo = await MarketMakerRepo.initialize(
                signer,
                fpmmAddress,
                conditionalTokensAddress,
                collateralAddress
            );
            let trx1 = await fpmmRepo.setCollateralApproval(funding);
            await trx1.wait();
            let trx2 = await fpmmRepo.addLiquidityInitial(funding, initialOdds);
            await trx2.wait();

            const account = await signer.getAddress();
            console.log("[INFO] Market Creator Address: ", account);
            console.log("[INFO] Created Condition ID:   ", conditionId);
            console.log("[INFO] FPMarketMaker Address:  ", fpmmAddress);

            return [conditionId, fpmmAddress];
        } catch (error) {
            throw error;
        }
    }
}
