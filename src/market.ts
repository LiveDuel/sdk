import { ethers, BigNumberish, Signer, utils } from "ethers";
import { initial } from "lodash";
import { ConditionalTokensRepo } from "./conditionalTokens";
import { ERC20__factory, FixedProductMarketMaker__factory } from "./contracts";
import { MarketMakerRepo, MarketMakerFactoryRepo } from "./fpmm";
import { Outcome } from "./utils";

export interface MarketInterface {
    readonly collateralAddress: string;
    readonly conditionId: string;
    readonly questionId: string;
    readonly outcomes: Outcome[];
    readonly fee: BigNumberish;

    /**
     * Buy a quantity of tokens
     * @param amounts Array of numbers representing quantity. Each entry corresponds to an Outcome, both keyed by the same index
     * @param slippage The percent slippage acceptable
     * @returns Promise which resolves to a transaction hash
     */
    buy: (amounts: string[], slippage: number) => Promise<ethers.ContractTransaction>;

    /**
     * Sell a quantity of tokens
     * @param amounts Array of numbers representing quantity. Each entry corresponds to an Outcome, both keyed by the same index
     * @param slippage The percent slippage acceptable
     * @returns Promise which resolves to a transaction hash
     */
    sell: (amounts: string[], slippage: number) => Promise<ethers.ContractTransaction>;

    /**
     * Add liquidity to a market
     * @param amount Amount of collateral token to spend
     * @returns Transaction hash and a promise which resolves to the number of LP tokens purchased
     */
    addLiquidity: (amount: number) => [string, Promise<number>];

    /**
     * Redeem position from market (after its closed?)
     * @returns Transaction hash and a promise which resolves to the number of LP tokens purchased
     */
    // redeem: () => Promise<ethers.ContractTransaction>;

    /**
     * Remove liquidity from a market
     * @param amount Amount of LP tokens to sell
     * @returns Transaction hash and a promise which resolves to the amount of collateral token received
     */
    removeLiquidity: (amount: number) => [string, Promise<number>];

    /**
     * Fetch current prices & probability of each outcome from the market
     * @returns ordered set of [price, probability] for [home, away, draw]
     */
    getCurrentPrices: () => Promise<[number, number][]>;

    /**
     * Load the historical prices of an Outcome
     * @param length Number of units to fetch data for
     */
    priceHistory: (length: number) => number[][];

    /**
     * Load the historical volume of an Outcome
     * @param length Number of units to fetch data for
     */
    volumeHistory: (length: number) => number[][];
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

    //[LEM] slippage not considered
    //[LEM] ensure approvals
    async buy(amounts: string[], slippage: number): Promise<ethers.ContractTransaction> {
        try {
            const account = await this._signer.getAddress();

            let cost = await this._marketMaker.calcNetCostRemote(amounts);

            //[LEM] accounting for cost+fees+otherstuff
            const AMOUNT_BUFFER = 1e6;
            cost = cost.add(AMOUNT_BUFFER);

            const collateralBalance = await this._marketMaker.getCollateralBalance(account);

            if (cost.gt(collateralBalance)) {
                throw new Error("Insufficient collateral balance in account");
            } else {
                await this._marketMaker.setCollateralApproval(cost, account);
                const trx = await this._marketMaker.trade(amounts, cost, account);
                return trx;
            }
        } catch (error) {
            throw error;
        }
    }

    async sell(amounts: string[], slippage: number): Promise<ethers.ContractTransaction> {
        try {
            const account = await this._signer.getAddress();

            //[LEM] ensure 1155 token balance > amounts
            const isApproved = await this._marketMaker.getConditionalTokenApproval(account);
            if (!isApproved) {
                await this._marketMaker.setConditionalTokenApproval(true, account);
            }

            amounts = amounts.map((i) => "-" + i);
            const profit = await this._marketMaker.calcNetCostRemote(amounts);
            const trx = await this._marketMaker.trade(amounts, profit, account);
            return trx;
        } catch (error) {
            throw error;
        }
    }

    addLiquidity(amount: number): [string, Promise<number>] {
        let transactionHash = utils.randomBytes(32).toString();
        let liquidityAdded: Promise<number> = new Promise((resolve, reject) => resolve(amount));

        return [transactionHash, liquidityAdded];
    }

    removeLiquidity(amount: number): [string, Promise<number>] {
        let transactionHash = utils.randomBytes(32).toString();
        let liquidityRemoved: Promise<number> = new Promise((resolve, reject) => resolve(amount));

        return [transactionHash, liquidityRemoved];
    }

    async getNetCost(amounts: string[], buy: boolean): Promise<string> {
        if (!buy) amounts = amounts.map((i) => "-" + i);
        const cost = await this._marketMaker.calcNetCostRemote(amounts);
        return cost.toString();
    }

    async getCurrentPrices(): Promise<[number, number][]> {
        let prices = [];
        for (let i = 0; i < this.outcomes.length; i++) {
            const [price, prob] = await this._marketMaker.calcPriceRemote(i);
            prices.push([price, prob] as [number, number]);
        }
        return prices;
    }

    priceHistory(length: number): number[][] {
        return this.outcomes.map((_, idx) => {
            return Array.from(Array(length).keys()).map(() => Math.random());
        });
    }

    volumeHistory(length: number): number[][] {
        return this.outcomes.map((_, idx) => {
            return Array.from(Array(length).keys()).map(() => Math.random());
        });
    }

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
    //withdrawFee //close
    //changeFee
    //changeFunding

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
            const account = await signer.getAddress();
            const ctRepo = new ConditionalTokensRepo(signer, conditionalTokensAddress);
            const fpmmFactoryRepo = new MarketMakerFactoryRepo(signer, marketMakerFactoryAddress);

            // `prepareCondition` & set up `FixedProductMarketMaker`
            const conditionId = await ctRepo.createCondition(oracle, questionId, outcomes);
            const fpmmAddress = await fpmmFactoryRepo.createFPMarketMaker(
                collateralAddress,
                conditionalTokensAddress,
                conditionId,
                fee
            );

            // approve collateral to be funded to LMSR
            const collateral = ERC20__factory.connect(collateralAddress, signer);
            let trx1 = await collateral.approve(fpmmAddress, funding, { from: account });
            await trx1.wait();

            const fpmmRepo = await MarketMakerRepo.initialize(
                signer,
                fpmmAddress,
                conditionalTokensAddress,
                collateralAddress
            );
            let trx2 = await fpmmRepo.addLiquidityInitial(funding, initialOdds);
            await trx2.wait();

            console.log("[INFO] Market Creator Address: ", account);
            console.log("[INFO] Created Condition ID:   ", conditionId);
            console.log("[INFO] FPMarketMaker Address:  ", fpmmAddress);

            return [conditionId, fpmmAddress];
        } catch (error) {
            throw error;
        }
    }
}
