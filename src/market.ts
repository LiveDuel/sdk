import _ from "lodash";
import { BigNumber as BN } from "bignumber.js";
import { ethers, BigNumber, BigNumberish, Signer, utils, ContractTransaction } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { ConditionalTokensRepo } from "./conditionalTokens";
import { MarketMakerRepo, MarketMakerFactoryRepo } from "./fpmm";
import { Outcome } from "./utils";

declare module "ethers" {
    export interface BigNumber {
        ceildiv(divisor: BigNumber): BigNumber;
    }
}

BigNumber.prototype.ceildiv = function (divisor: BigNumber) {
    const quotient = this.div(divisor);
    const remainder = this.mod(divisor);
    if (remainder.isZero()) {
        return quotient;
    } else {
        return quotient.add(1);
    }
};

export interface MarketInterface {
    readonly collateralAddress: string;
    readonly conditionId: string;
    readonly questionId: string;
    readonly outcomes: [Outcome, Outcome, Outcome];
    readonly fee: BigNumber;

    getUserTokenBalances: () => Promise<BigNumber[]>;

    getPoolTokenBalances: () => Promise<BigNumber[]>;

    getCurrentOdds: () => Promise<number[]>;

    calcBuyTokens_RPC: (amountInvest: BigNumber, outcomeIndex: number) => Promise<BigNumber>;

    calcSellTokens_RPC: (amountReturn: BigNumber, outcomeIndex: number) => Promise<BigNumber>;

    calcBuyTokens: (amountInvest: BigNumber, outcomeIndex: number) => Promise<BigNumber>;

    calcSellTokens: (amountReturn: BigNumber, outcomeIndex: number) => Promise<BigNumber>;

    // calcBuyAmount: (tokenAmountBuy: BigNumber, outcomeIndex: number) => Promise<BigNumber>;

    // calcSellAmount: (tokenAmountSell: BigNumber, outcomeIndex: number) => Promise<BigNumber>;

    /**
     * Buy a quantity of tokens
     * @param amountInvest Amount of collateral tokens to put into the market
     * @param outcomeIndex Index of outcome tokens to be bought
     * @param slippage The percent slippage acceptable
     * @returns Promise which resolves to a transaction
     */
    buy: (
        amountInvest: BigNumber,
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
        amountReturn: BigNumber,
        outcomeIndex: number,
        slippage: number
    ) => Promise<ContractTransaction>;

    // addLiquidity: (amount: number) => Promise<>;

    // removeLiquidity: (amount: number) => Promise<>;

    redeem: () => Promise<ContractTransaction>;
}

export class Market implements MarketInterface {
    private readonly _signer: Signer;
    private readonly _oracle: string;
    private readonly _marketMaker: MarketMakerRepo;

    private readonly ONE: BigNumber = ethers.constants.WeiPerEther;

    readonly collateralAddress: string;
    readonly conditionId: string;
    readonly questionId: string;
    readonly outcomes: [Outcome, Outcome, Outcome];
    readonly fee: BigNumber;

    constructor(
        signer: Signer,
        oracle: string,
        collateralAddress: string,
        conditionId: string,
        questionId: string,
        outcomes: [Outcome, Outcome, Outcome],
        fee: BigNumber,
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
            let bal = await this._marketMaker.getConditionalTokenBalance(account, outcome.position_id);
            balances.push(bal);
        }
        return balances;
    };

    getPoolTokenBalances = async (): Promise<BigNumber[]> => {
        const balances = [];
        for (const outcome of this.outcomes) {
            let bal = await this._marketMaker.getConditionalTokenBalance(
                this._marketMaker.contractAddress,
                outcome.position_id
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

    calcBuyTokens_RPC = async (amountInvest: BigNumber, outcomeIndex: number): Promise<BigNumber> => {
        return this._marketMaker.calcBuyTokens(amountInvest, outcomeIndex);
    };

    calcSellTokens_RPC = async (amountReturn: BigNumber, outcomeIndex: number): Promise<BigNumber> => {
        return this._marketMaker.calcSellTokens(amountReturn, outcomeIndex);
    };

    calcBuyTokens = async (amountInvest: BigNumber, outcomeIndex: number): Promise<BigNumber> => {
        const balances = await this.getPoolTokenBalances();
        const buyTokenPoolBalance = balances[outcomeIndex];
        const investmentAmountMinusFees = amountInvest.sub(amountInvest.mul(this.fee).div(this.ONE));

        let endingOutcomeBalance = buyTokenPoolBalance.mul(this.ONE);
        for (let i = 0; i < balances.length; i++) {
            if (i != outcomeIndex) {
                const poolBalance = balances[i];
                endingOutcomeBalance = endingOutcomeBalance
                    .mul(poolBalance)
                    .ceildiv(poolBalance.add(investmentAmountMinusFees));
            }
        }
        const tokenBuyAmount = buyTokenPoolBalance
            .add(investmentAmountMinusFees)
            .sub(endingOutcomeBalance.ceildiv(this.ONE));

        return tokenBuyAmount;
    };

    calcSellTokens = async (amountReturn: BigNumber, outcomeIndex: number): Promise<BigNumber> => {
        const balances = await this.getPoolTokenBalances();
        const sellTokenPoolBalance = balances[outcomeIndex];
        const returnAmountPlusFees = amountReturn.mul(this.ONE).div(this.ONE.sub(this.fee));

        let endingOutcomeBalance = sellTokenPoolBalance.mul(this.ONE);
        for (let i = 0; i < balances.length; i++) {
            if (i != outcomeIndex) {
                const poolBalance = balances[i];
                endingOutcomeBalance = endingOutcomeBalance
                    .mul(poolBalance)
                    .ceildiv(poolBalance.sub(returnAmountPlusFees));
            }
        }
        const tokenSellAmt = returnAmountPlusFees
            .add(endingOutcomeBalance.ceildiv(this.ONE))
            .sub(sellTokenPoolBalance);

        return tokenSellAmt;
    };

    //[LEM] slippage not considered
    //[LEM] ensure approvals
    buy = async (
        amountInvest: BigNumber,
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
        amountReturn: BigNumber,
        outcomeIndex: number,
        slippage: number
    ): Promise<ContractTransaction> => {
        try {
            //[LEM] Temp
            const MAXTOKENS = "1" + "0".repeat(22);

            const account = await this._signer.getAddress();

            const outcomeTokenBalance = await this._marketMaker.getConditionalTokenBalance(
                account,
                this.outcomes[outcomeIndex].position_id
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

    redeem = async (): Promise<ContractTransaction> => {
        try {
            return await this._marketMaker.redeem(this.conditionId);
        } catch (error) {
            throw error;
        }
    };

    /**
     * Safely initializes the Market class instance to be used by clients/traders.
     * @param signer Signer to use to deploy market
     * @param marketMakerAddress Address of the deployed FixedProductMarketMaker contract
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
        outcomes: [Outcome, Outcome, Outcome],
        fee: BigNumber
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
    //[LEM] pending methods
    //pause
    //resume

    /**
     * Allows the liquidity provider (admin) to withdraw their fee after market is closed.
     * @param signer Signer to use to deploy market
     * @param marketMakerAddress Address of the deployed FixedProductMarketMaker contract
     * @param conditionalTokensAddress Address of the deployed ConditionalTokens contract
     * @param collateralAddress Address of the collateral token contract
     * @returns ContractTransaction object
     */
    static async withdrawLPFees(
        signer: Signer,
        marketMakerAddress: string,
        conditionalTokensAddress: string,
        collateralAddress: string
    ): Promise<ContractTransaction> {
        const fpmmRepo: MarketMakerRepo = await MarketMakerRepo.initialize(
            signer,
            marketMakerAddress,
            conditionalTokensAddress,
            collateralAddress
        );

        return fpmmRepo.withdrawFeeAmount();
    }

    /**
     * Creates a market and a market maker for the specified market details.
     * @param signer Signer to use to deploy market
     * @param conditionalTokensAddress Address of the deployed ConditionalTokens contract
     * @param questionId questionId used to create the market
     * @param payouts: payout vector to report winner (eg: [0,1,0])
     * @returns ContractTransaction object
     */
    static async resolveMarket(
        signer: Signer,
        conditionalTokensAddress: string,
        questionId: string,
        payouts: number[]
    ): Promise<ContractTransaction> {
        try {
            const ctRepo = new ConditionalTokensRepo(signer, conditionalTokensAddress);
            let trx1 = await ctRepo.reportPayouts(questionId, payouts);
            await trx1.wait();

            console.log("[INFO] Market resolved with payouts: ", payouts);
            return trx1;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a market and a market maker for the specified market details.
     * @param signer Signer to use to deploy market
     * @param collateralAddress Address of the collateral token contract
     * @param conditionalTokensAddress Address of the deployed ConditionalTokens contract
     * @param marketMakerFactoryAddress Address of the deployed FixedProductMarketMakerFactory contract
     * @param oracle Address of the oracle to use. Defaults to address of signer
     * @param questionId questionId used to create the market
     * @param outcomes Array of outcome objects
     * @param fee fee (uint64)
     * @param funding initial funding provided to the market
     * @param initialOdds: initial odds for outcomes of the market
     * @returns [conditionId, fpmmAddress, positionId[]]
     */
    static async createMarket(
        signer: Signer,
        collateralAddress: string,
        conditionalTokensAddress: string,
        marketMakerFactoryAddress: string,
        oracle: string,
        questionId: string,
        outcomes: [Outcome, Outcome, Outcome],
        fee: BigNumber,
        funding: BigNumber,
        initialOdds: [number, number, number]
    ): Promise<[string, string, string[]]> {
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

            // calculate token positionIds
            let positionIds: string[] = [];
            for (let outcomeI = 0; outcomeI < outcomes.length; outcomeI++) {
                const positionId = await ctRepo.getPositionId(collateralAddress, conditionId, outcomeI);
                positionIds.push(positionId);
            }

            // approve collateral and fund FixedProductMarketMaker
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
            console.log("[INFO] Token position IDs: ", positionIds);

            return [conditionId, fpmmAddress, positionIds];
        } catch (error) {
            throw error;
        }
    }
}

export interface MarketWatcherInterface {
    readonly provider: Provider;
    readonly conditionId: string;
    readonly marketMakerAddress: string;
    readonly conditionalTokensAddress: string;
    readonly outcomes: [Outcome, Outcome, Outcome];

    getPoolTokenBalances: () => Promise<BigNumber[]>;

    getCurrentOdds: () => Promise<number[]>;
}

export class MarketWatcher implements MarketWatcherInterface {
    private readonly _conditionalTokens: ConditionalTokensRepo;

    readonly provider: Provider;
    readonly conditionId: string;
    readonly marketMakerAddress: string;
    readonly conditionalTokensAddress: string;
    readonly outcomes: [Outcome, Outcome, Outcome];

    constructor(
        provider: Provider,
        marketMakerAddress: string,
        conditionalTokensAddress: string,
        conditionId: string,
        outcomes: [Outcome, Outcome, Outcome]
    ) {
        this.provider = provider;
        this.marketMakerAddress = marketMakerAddress;
        this.conditionalTokensAddress = conditionalTokensAddress;
        this.conditionId = conditionId;
        this.outcomes = outcomes;

        this._conditionalTokens = new ConditionalTokensRepo(provider, conditionalTokensAddress);
    }

    getPoolTokenBalances = async (): Promise<BigNumber[]> => {
        const balances = [];
        for (const outcome of this.outcomes) {
            let bal = await this._conditionalTokens.getBalance(
                this.marketMakerAddress,
                outcome.position_id
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
}
