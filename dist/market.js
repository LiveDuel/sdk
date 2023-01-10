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
exports.MarketAdmin = exports.Market = void 0;
const ethers_1 = require("ethers");
const conditionalTokens_1 = require("./conditionalTokens");
const contracts_1 = require("./contracts");
const fpmm_1 = require("./fpmm");
class Market {
    constructor(signer, oracle, collateralAddress, conditionId, questionId, outcomes, fee, marketMaker) {
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
    buy(amounts, slippage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this._signer.getAddress();
                let cost = yield this._marketMaker.calcNetCostRemote(amounts);
                //[LEM] accounting for cost+fees+otherstuff
                const AMOUNT_BUFFER = 1e6;
                cost = cost.add(AMOUNT_BUFFER);
                const collateralBalance = yield this._marketMaker.getCollateralBalance(account);
                if (cost.gt(collateralBalance)) {
                    throw new Error("Insufficient collateral balance in account");
                }
                else {
                    yield this._marketMaker.setCollateralApproval(cost, account);
                    const trx = yield this._marketMaker.trade(amounts, cost, account);
                    return trx;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    sell(amounts, slippage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this._signer.getAddress();
                //[LEM] ensure 1155 token balance > amounts
                const isApproved = yield this._marketMaker.getConditionalTokenApproval(account);
                if (!isApproved) {
                    yield this._marketMaker.setConditionalTokenApproval(true, account);
                }
                amounts = amounts.map((i) => "-" + i);
                const profit = yield this._marketMaker.calcNetCostRemote(amounts);
                const trx = yield this._marketMaker.trade(amounts, profit, account);
                return trx;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addLiquidity(amount) {
        let transactionHash = ethers_1.utils.randomBytes(32).toString();
        let liquidityAdded = new Promise((resolve, reject) => resolve(amount));
        return [transactionHash, liquidityAdded];
    }
    removeLiquidity(amount) {
        let transactionHash = ethers_1.utils.randomBytes(32).toString();
        let liquidityRemoved = new Promise((resolve, reject) => resolve(amount));
        return [transactionHash, liquidityRemoved];
    }
    getNetCost(amounts, buy) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!buy)
                amounts = amounts.map((i) => "-" + i);
            const cost = yield this._marketMaker.calcNetCostRemote(amounts);
            return cost.toString();
        });
    }
    getCurrentPrices() {
        return __awaiter(this, void 0, void 0, function* () {
            let prices = [];
            for (let i = 0; i < this.outcomes.length; i++) {
                const [price, prob] = yield this._marketMaker.calcPriceRemote(i);
                prices.push([price, prob]);
            }
            return prices;
        });
    }
    priceHistory(length) {
        return this.outcomes.map((_, idx) => {
            return Array.from(Array(length).keys()).map(() => Math.random());
        });
    }
    volumeHistory(length) {
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
    static initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress, oracle, conditionId, questionId, outcomes, fee) {
        return __awaiter(this, void 0, void 0, function* () {
            const lmsrMarketMaker = yield fpmm_1.MarketMakerRepo.initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress);
            return new Market(signer, oracle, collateralAddress, conditionId, questionId, outcomes, fee, lmsrMarketMaker);
        });
    }
}
exports.Market = Market;
class MarketAdmin {
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
     * @returns [conditionId, lmsrmmAddress]
     */
    static createMarket(signer, collateralAddress, conditionalTokensAddress, marketMakerFactoryAddress, oracle, questionId, outcomes, fee, funding) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // init
                const ctRepo = new conditionalTokens_1.ConditionalTokensRepo(signer, conditionalTokensAddress);
                const lmsrmmFactoryRepo = new fpmm_1.MarketMakerFactoryRepo(signer, marketMakerFactoryAddress);
                // approve collateral to be funded to LMSR
                const collateral = contracts_1.ERC20__factory.connect(collateralAddress, signer);
                let trx = yield collateral.approve(marketMakerFactoryAddress, funding);
                yield trx.wait();
                // `prepareCondition` & set up `LMSRMarketMaker`
                const conditionId = yield ctRepo.createCondition(oracle, questionId, outcomes);
                const lmsrmmAddress = yield lmsrmmFactoryRepo.createLMSRMarketMaker(collateralAddress, conditionalTokensAddress, conditionId, fee, funding);
                console.log("[INFO] Created Condition ID:    ", conditionId);
                console.log("[INFO] LMSRMarketMaker Address: ", lmsrmmAddress);
                return [conditionId, lmsrmmAddress];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MarketAdmin = MarketAdmin;
