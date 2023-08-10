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
const bignumber_js_1 = require("bignumber.js");
const ethers_1 = require("ethers");
const conditionalTokens_1 = require("./conditionalTokens");
const fpmm_1 = require("./fpmm");
ethers_1.BigNumber.prototype.ceildiv = function (divisor) {
    const quotient = this.div(divisor);
    const remainder = this.mod(divisor);
    if (remainder.isZero()) {
        return quotient;
    }
    else {
        return quotient.add(1);
    }
};
class Market {
    constructor(signer, oracle, collateralAddress, conditionId, questionId, outcomes, fee, marketMaker) {
        this.ONE = ethers_1.ethers.constants.WeiPerEther;
        this.OPTIM_CONSTANTS = {
            alpha: 0.1,
            maxIterations: 1000,
            slopeXOffset: 0.001,
            tolerance: ethers_1.BigNumber.from((0, bignumber_js_1.BigNumber)(1e6).toString()),
        };
        this.getUserCollateralBalance = () => __awaiter(this, void 0, void 0, function* () {
            const account = yield this._signer.getAddress();
            return this._marketMaker.getCollateralBalance(account);
        });
        this.getUserLPTokenBalance = () => __awaiter(this, void 0, void 0, function* () {
            const account = yield this._signer.getAddress();
            return this._marketMaker.getLPTokenBalance(account);
        });
        this.getUserTokenBalances = () => __awaiter(this, void 0, void 0, function* () {
            const account = yield this._signer.getAddress();
            const balances = [];
            for (const outcome of this.outcomes) {
                let bal = yield this._marketMaker.getConditionalTokenBalance(account, outcome.position_id);
                balances.push(bal);
            }
            return balances;
        });
        this.getPoolTokenBalances = () => __awaiter(this, void 0, void 0, function* () {
            const balances = [];
            for (const outcome of this.outcomes) {
                let bal = yield this._marketMaker.getConditionalTokenBalance(this._marketMaker.contractAddress, outcome.position_id);
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
        this.calcBuyTokens_RPC = (amountInvest, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            return this._marketMaker.calcBuyTokens(amountInvest, outcomeIndex);
        });
        this.calcSellTokens_RPC = (amountReturn, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            return this._marketMaker.calcSellTokens(amountReturn, outcomeIndex);
        });
        this.calcBuyTokens = (amountInvest, outcomeIndex, poolBalances) => __awaiter(this, void 0, void 0, function* () {
            const balances = poolBalances ? poolBalances : yield this.getPoolTokenBalances();
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
        });
        this.calcSellTokens = (amountReturn, outcomeIndex, poolBalances) => __awaiter(this, void 0, void 0, function* () {
            const balances = poolBalances ? poolBalances : yield this.getPoolTokenBalances();
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
        });
        this.calcBuyAmount = (tokenAmountBuy, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            const balances = yield this.getPoolTokenBalances();
            const alphaInv = ethers_1.BigNumber.from(1 / this.OPTIM_CONSTANTS.alpha);
            // starting collateral amount
            let invAmt = ethers_1.BigNumber.from((0, bignumber_js_1.BigNumber)(1e18).toString());
            for (let counter = 0; counter < this.OPTIM_CONSTANTS.maxIterations; counter++) {
                // calc output, difference to expected value, slope
                const calculatedTokenBuyAmount = yield this.calcBuyTokens(invAmt, outcomeIndex, balances);
                const diff = calculatedTokenBuyAmount.sub(tokenAmountBuy);
                const slope = yield this.calcForwardMethodSlope(this.calcBuyTokens, balances, invAmt, this.OPTIM_CONSTANTS.slopeXOffset, outcomeIndex);
                // Update the investment amount
                const offset = diff.div(slope).div(alphaInv);
                invAmt = invAmt.sub(offset);
                // Check for convergence
                if (diff.abs().lte(this.OPTIM_CONSTANTS.tolerance)) {
                    break;
                }
            }
            return invAmt;
        });
        this.calcSellAmount = (tokenAmountSell, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            const balances = yield this.getPoolTokenBalances();
            const alphaInv = ethers_1.BigNumber.from(1 / this.OPTIM_CONSTANTS.alpha);
            // starting collateral amount
            let retAmt = ethers_1.BigNumber.from((0, bignumber_js_1.BigNumber)(1e18).toString()); // Set initial investment amount
            for (let counter = 0; counter < this.OPTIM_CONSTANTS.maxIterations; counter++) {
                // calc output, difference to expected value, slope
                const calculatedSellAmount = yield this.calcSellTokens(retAmt, outcomeIndex, balances);
                const diff = calculatedSellAmount.sub(tokenAmountSell);
                const slope = yield this.calcForwardMethodSlope(this.calcSellTokens, balances, retAmt, this.OPTIM_CONSTANTS.slopeXOffset, outcomeIndex);
                // Update the return amount
                const offset = diff.div(slope).div(alphaInv);
                retAmt = retAmt.sub(offset);
                // Check for convergence
                if (diff.abs().lte(this.OPTIM_CONSTANTS.tolerance)) {
                    break;
                }
            }
            return retAmt;
        });
        this.calcForwardMethodSlope = (method, poolBalances, collateralAmount, dx, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            const collateralAmount2 = collateralAmount.add(ethers_1.BigNumber.from((0, bignumber_js_1.BigNumber)(`${dx}e18`).toString()));
            const y1 = yield method(collateralAmount, outcomeIndex, poolBalances);
            const y2 = yield method(collateralAmount2, outcomeIndex, poolBalances);
            const num = (0, bignumber_js_1.BigNumber)(y2.sub(y1).toString());
            const den = (0, bignumber_js_1.BigNumber)(collateralAmount2.sub(collateralAmount).toString());
            let slope = Number(num.div(den).toFixed());
            slope = slope > 1 ? Number(slope.toPrecision(1)) : 1;
            return slope;
        });
        //[LEM] slippage not considered
        //[LEM] ensure approvals
        this.buy = (amountInvest, outcomeIndex, slippage) => __awaiter(this, void 0, void 0, function* () {
            try {
                //[LEM] Temp
                const MINTOKENS = "1";
                const collateralBalance = yield this.getUserCollateralBalance();
                if (amountInvest.gt(collateralBalance)) {
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
                const outcomeTokenBalance = (yield this.getUserTokenBalances())[outcomeIndex];
                const outcomeTokensToSell = yield this._marketMaker.calcSellTokens(amountReturn, outcomeIndex);
                //[LEM] slippage not considered (outcomeTokensToSell + slippage%OfTokens)
                if (outcomeTokensToSell.gt(outcomeTokenBalance)) {
                    throw new Error("Insufficient position token balance in account");
                }
                const account = yield this._signer.getAddress();
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
        this.redeem = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._marketMaker.redeem(this.conditionId);
            }
            catch (error) {
                throw error;
            }
        });
        this.addLiquidity = (amount) => __awaiter(this, void 0, void 0, function* () {
            try {
                const collateralBalance = yield this.getUserCollateralBalance();
                if (amount.gt(collateralBalance)) {
                    throw new Error("Insufficient collateral balance in account");
                }
                else {
                    let trx1 = yield this._marketMaker.setCollateralApproval(amount);
                    yield trx1.wait();
                    let trx2 = yield this._marketMaker.addLiquidity(amount);
                    return trx2;
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.removeLiquidity = (amountLP) => __awaiter(this, void 0, void 0, function* () {
            try {
                const LPBalance = yield this.getUserLPTokenBalance();
                if (amountLP.gt(LPBalance)) {
                    throw new Error("Insufficient LP Token balance in account");
                }
                else {
                    let trx1 = yield this._marketMaker.setLPTokenApproval(amountLP);
                    yield trx1.wait();
                    let trx2 = yield this._marketMaker.removeLiquidity(amountLP);
                    return trx2;
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.getWithdrawableLiquidityFees = () => __awaiter(this, void 0, void 0, function* () {
            const account = yield this._signer.getAddress();
            return this._marketMaker.getWithdrawableFeeAmount(account);
        });
        this.withdrawLiquidityFees = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return this._marketMaker.withdrawFeeAmount();
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
    static initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress, oracle, conditionId, questionId, outcomes, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const fpmmRepo = yield fpmm_1.MarketMakerRepo.initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress);
            return new Market(signer, oracle, collateralAddress, conditionId, questionId, outcomes, fee, fpmmRepo);
        });
    }
}
exports.Market = Market;
class MarketAdmin {
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
    static withdrawLPFees(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const fpmmRepo = yield fpmm_1.MarketMakerRepo.initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress);
            return fpmmRepo.withdrawFeeAmount();
        });
    }
    /**
     * Creates a market and a market maker for the specified market details.
     * @param signer Signer to use to deploy market
     * @param conditionalTokensAddress Address of the deployed ConditionalTokens contract
     * @param questionId questionId used to create the market
     * @param payouts: payout vector to report winner (eg: [0,1,0])
     * @returns ContractTransaction object
     */
    static resolveMarket(signer, conditionalTokensAddress, questionId, payouts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ctRepo = new conditionalTokens_1.ConditionalTokensRepo(signer, conditionalTokensAddress);
                let trx1 = yield ctRepo.reportPayouts(questionId, payouts);
                yield trx1.wait();
                console.log("[INFO] Market resolved with payouts: ", payouts);
                return trx1;
            }
            catch (error) {
                throw error;
            }
        });
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
    static createMarket(signer, collateralAddress, conditionalTokensAddress, marketMakerFactoryAddress, oracle, questionId, outcomes, fee, funding, initialOdds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // init
                const ctRepo = new conditionalTokens_1.ConditionalTokensRepo(signer, conditionalTokensAddress);
                const fpmmFactoryRepo = new fpmm_1.MarketMakerFactoryRepo(signer, marketMakerFactoryAddress);
                // `prepareCondition` & set up `FixedProductMarketMaker`
                const conditionId = yield ctRepo.createCondition(oracle, questionId, outcomes.length);
                const fpmmAddress = yield fpmmFactoryRepo.createFPMarketMaker(collateralAddress, conditionalTokensAddress, conditionId, fee);
                // calculate token positionIds
                let positionIds = [];
                for (let outcomeI = 0; outcomeI < outcomes.length; outcomeI++) {
                    const positionId = yield ctRepo.getPositionId(collateralAddress, conditionId, outcomeI);
                    positionIds.push(positionId);
                }
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
                console.log("[INFO] Token position IDs: ", positionIds);
                return [conditionId, fpmmAddress, positionIds];
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
                let bal = yield this._conditionalTokens.getBalance(this.marketMakerAddress, outcome.position_id);
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
