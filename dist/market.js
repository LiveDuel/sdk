"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketWatcher = exports.MarketAdmin = exports.Market = void 0;
const ethers_1 = require("ethers");
const conditionalTokens_1 = require("./conditionalTokens");
const fpmm_1 = require("./fpmm");
class Market {
    constructor(signer, oracle, collateralAddress, conditionId, questionId, outcomes, fee, marketMaker) {
        this.getUserTokenBalances = () => __awaiter(this, void 0, void 0, function* () {
            const account = yield this._signer.getAddress();
            const balances = [];
            for (const outcome of this.outcomes) {
                let bal = yield this._marketMaker.getConditionalTokenBalance(account, outcome.positionId);
                balances.push(bal);
            }
            return balances;
        });
        this.getPoolTokenBalances = () => __awaiter(this, void 0, void 0, function* () {
            const balances = [];
            for (const outcome of this.outcomes) {
                let bal = yield this._marketMaker.getConditionalTokenBalance(this._marketMaker.contractAddress, outcome.positionId);
                balances.push(bal);
            }
            return balances;
        });
        this.getCurrentOdds = () => __awaiter(this, void 0, void 0, function* () {
            const balancesRaw = yield this.getPoolTokenBalances();
            const balances = balancesRaw.map((i) => ethers_1.utils.formatEther(i));
            const oddsWeight = [];
            for (let i = 0; i < balances.length; i++) {
                const bf = balances.filter((item, index) => index != i);
                const bm = bf.map((item) => Number(item));
                const br = bm.reduce((acc = 1, item) => (acc *= item));
                oddsWeight.push(br);
            }
            const oddsWeightSum = oddsWeight.reduce((acc = 0, item) => (acc += item));
            const odds = oddsWeight.map((item) => item / oddsWeightSum);
            return odds;
        });
        this.calcBuyTokens = (amountInvest, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            return this._marketMaker.calcBuyTokens(amountInvest, outcomeIndex);
        });
        this.calcSellTokens = (amountReturn, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            return this._marketMaker.calcSellTokens(amountReturn, outcomeIndex);
        });
        //[LEM] slippage not considered
        //[LEM] ensure approvals
        this.buy = (amountInvest, outcomeIndex, slippage) => __awaiter(this, void 0, void 0, function* () {
            try {
                //[LEM] Temp
                const MINTOKENS = "1";
                const account = yield this._signer.getAddress();
                const collateralBalance = yield this._marketMaker.getCollateralBalance(account);
                if (ethers_1.BigNumber.from(amountInvest).gt(collateralBalance)) {
                    throw new Error("Insufficient collateral balance in account");
                }
                else {
                    let trx1 = yield this._marketMaker.setCollateralApproval(amountInvest);
                    yield trx1.wait();
                    let trx2 = yield this._marketMaker.buy(amountInvest, outcomeIndex, MINTOKENS);
                    return trx2;
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.sell = (amountReturn, outcomeIndex, slippage) => __awaiter(this, void 0, void 0, function* () {
            try {
                //[LEM] Temp
                const MAXTOKENS = "1" + "0".repeat(22);
                const account = yield this._signer.getAddress();
                const outcomeTokenBalance = yield this._marketMaker.getConditionalTokenBalance(account, this.outcomes[outcomeIndex].positionId);
                const outcomeTokensToSell = yield this._marketMaker.calcSellTokens(amountReturn, outcomeIndex);
                //[LEM] slippage not considered (outcomeTokensToSell + slippage%OfTokens)
                if (outcomeTokensToSell.gt(outcomeTokenBalance)) {
                    throw new Error("Insufficient position token balance in account");
                }
                const isApproved = yield this._marketMaker.getConditionalTokenApproval(account);
                if (!isApproved) {
                    let trx1 = yield this._marketMaker.setConditionalTokenApproval(true);
                    yield trx1.wait();
                }
                let trx2 = yield this._marketMaker.sell(amountReturn, outcomeIndex, MAXTOKENS);
                return trx2;
            }
            catch (error) {
                throw error;
            }
        });
        this._signer = signer;
        this._oracle = oracle;
        this._marketMaker = marketMaker;
        this.collateralAddress = collateralAddress;
        this.conditionId = conditionId;
        this.questionId = questionId;
        this.outcomes = outcomes;
        this.fee = fee;
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
    static initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress, oracle, conditionId, questionId, outcomes, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const fpmmRepo = yield fpmm_1.MarketMakerRepo.initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress);
            return new Market(signer, oracle, collateralAddress, conditionId, questionId, outcomes, fee, fpmmRepo);
        });
    }
}
exports.Market = Market;
class MarketAdmin {
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
    static createMarket(signer, collateralAddress, conditionalTokensAddress, marketMakerFactoryAddress, oracle, questionId, outcomes, fee, funding, initialOdds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // init
                const ctRepo = new conditionalTokens_1.ConditionalTokensRepo(signer, conditionalTokensAddress);
                const fpmmFactoryRepo = new fpmm_1.MarketMakerFactoryRepo(signer, marketMakerFactoryAddress);
                // `prepareCondition` & set up `FixedProductMarketMaker`
                const conditionId = yield ctRepo.createCondition(oracle, questionId, outcomes.length);
                const fpmmAddress = yield fpmmFactoryRepo.createFPMarketMaker(collateralAddress, conditionalTokensAddress, conditionId, fee);
                // approve collateral and fund FixedProductMarketMaker
                const fpmmRepo = yield fpmm_1.MarketMakerRepo.initialize(signer, fpmmAddress, conditionalTokensAddress, collateralAddress);
                let trx1 = yield fpmmRepo.setCollateralApproval(funding);
                yield trx1.wait();
                let trx2 = yield fpmmRepo.addLiquidityInitial(funding, initialOdds);
                yield trx2.wait();
                const account = yield signer.getAddress();
                console.log("[INFO] Market Creator Address: ", account);
                console.log("[INFO] Created Condition ID:   ", conditionId);
                console.log("[INFO] FPMarketMaker Address:  ", fpmmAddress);
                return [conditionId, fpmmAddress];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MarketAdmin = MarketAdmin;
class MarketWatcher {
    constructor(provider, marketMakerAddress, conditionalTokensAddress, conditionId, outcomes) {
        this.getPoolTokenBalances = () => __awaiter(this, void 0, void 0, function* () {
            const balances = [];
            for (const outcome of this.outcomes) {
                let bal = yield this._conditionalTokens.getBalance(this.marketMakerAddress, outcome.positionId);
                balances.push(bal);
            }
            return balances;
        });
        this.getCurrentOdds = () => __awaiter(this, void 0, void 0, function* () {
            const balancesRaw = yield this.getPoolTokenBalances();
            const balances = balancesRaw.map((i) => ethers_1.utils.formatEther(i));
            const oddsWeight = [];
            for (let i = 0; i < balances.length; i++) {
                const bf = balances.filter((item, index) => index != i);
                const bm = bf.map((item) => Number(item));
                const br = bm.reduce((acc = 1, item) => (acc *= item));
                oddsWeight.push(br);
            }
            const oddsWeightSum = oddsWeight.reduce((acc = 0, item) => (acc += item));
            const odds = oddsWeight.map((item) => item / oddsWeightSum);
            return odds;
        });
        this.provider = provider;
        this.marketMakerAddress = marketMakerAddress;
        this.conditionalTokensAddress = conditionalTokensAddress;
        this.conditionId = conditionId;
        this.outcomes = outcomes;
        this._conditionalTokens = new conditionalTokens_1.ConditionalTokensRepo(provider, conditionalTokensAddress);
    }
}
exports.MarketWatcher = MarketWatcher;
