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
exports.MarketMakerRepo = exports.MarketMakerFactoryRepo = void 0;
const ethers_1 = require("ethers");
const conditionalTokens_1 = require("./conditionalTokens");
const contracts_1 = require("./contracts");
class MarketMakerFactoryRepo {
    constructor(signer, marketMakerFactoryAddress) {
        this.createFPMarketMaker = (collateralAddress, conditionalTokensAddress, conditionId, fee) => __awaiter(this, void 0, void 0, function* () {
            const tx = yield (yield this._contract.createFixedProductMarketMaker(conditionalTokensAddress, collateralAddress, [conditionId], fee)).wait(1);
            let deployedMarketAddress = undefined;
            tx.events &&
                tx.events.map((event) => {
                    if (event.event == "FixedProductMarketMakerCreation" && event.args !== undefined) {
                        deployedMarketAddress = event.args["fixedProductMarketMaker"];
                    }
                });
            if (deployedMarketAddress !== undefined) {
                return deployedMarketAddress;
            }
            else {
                console.error(JSON.stringify(tx, null, 2));
                throw new Error("No FixedProductMarketMakerCreation Event fired. Please check the TX above");
            }
        });
        this._contract = contracts_1.FixedProductMarketMakerFactory__factory.connect(marketMakerFactoryAddress, signer);
        if (!this._contract.address) {
            throw new Error("Error connecting to FixedProductMarketMakerFactory contract.");
        }
    }
}
exports.MarketMakerFactoryRepo = MarketMakerFactoryRepo;
class MarketMakerRepo {
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
    constructor(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress) {
        /* TOKEN METHODS */
        this.getCollateralBalance = (account) => __awaiter(this, void 0, void 0, function* () {
            return this._collateral.balanceOf(account);
        });
        this.getCollateralApproval = (account) => __awaiter(this, void 0, void 0, function* () {
            return this._collateral.allowance(account, this.contractAddress);
        });
        this.setCollateralApproval = (amount) => __awaiter(this, void 0, void 0, function* () {
            return this._collateral.approve(this.contractAddress, amount, {
                gasLimit: ethers_1.ethers.BigNumber.from(1e6), //[LEM] gasLimit
            });
        });
        this.getLPTokenBalance = (account) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.balanceOf(account);
        });
        this.getLPTokenApproval = (account) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.allowance(account, this.contractAddress);
        });
        this.setLPTokenApproval = (amount) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.approve(this.contractAddress, amount, {
                gasLimit: ethers_1.ethers.BigNumber.from(1e6), //[LEM] gasLimit
            });
        });
        this.getConditionalTokenBalance = (account, positionId) => __awaiter(this, void 0, void 0, function* () {
            return this._conditionalTokens.getBalance(account, positionId);
        });
        this.getConditionalTokenApproval = (account) => __awaiter(this, void 0, void 0, function* () {
            return this._conditionalTokens.getApprovalForAll(account, this.contractAddress);
        });
        this.setConditionalTokenApproval = (approved) => __awaiter(this, void 0, void 0, function* () {
            return this._conditionalTokens.setApprovalForAll(this.contractAddress, approved);
        });
        /* MARKET METHODS */
        this.addLiquidityInitial = (amount, initialOdds) => __awaiter(this, void 0, void 0, function* () {
            if (initialOdds.length > 3 || initialOdds.length < 3)
                throw new Error("Only 3 outcomes supported right now");
            const calcDistHint = (odds) => {
                const [O1, O2, O3] = odds;
                let D1 = 1;
                let D2 = (O1 * D1) / O2;
                let D3 = (O1 * D1) / O3;
                return [D1, D2, D3].map((v) => ethers_1.ethers.utils.parseEther(v.toString()));
            };
            const distHint = calcDistHint(initialOdds);
            return this._contract.addFunding(amount, distHint);
        });
        this.calcBuyTokens = (amountInvest, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.calcBuyAmount(amountInvest, outcomeIndex);
        });
        this.calcSellTokens = (amountReturn, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.calcSellAmount(amountReturn, outcomeIndex);
        });
        this.buy = (amountInvest, outcomeIndex, minOutcomeTokensToBuy) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.buy(amountInvest, outcomeIndex, minOutcomeTokensToBuy);
        });
        this.sell = (amountReturn, outcomeIndex, maxOutcomeTokensToSell) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.sell(amountReturn, outcomeIndex, maxOutcomeTokensToSell);
        });
        this.redeem = (conditionId) => __awaiter(this, void 0, void 0, function* () {
            return this._conditionalTokens.redeemPositions(this.collateralAddress, conditionId);
        });
        this._conditionalTokens = new conditionalTokens_1.ConditionalTokensRepo(signer, conditionalTokensAddress);
        this._contract = contracts_1.FixedProductMarketMaker__factory.connect(marketMakerAddress, signer);
        this._collateral = contracts_1.ERC20__factory.connect(collateralAddress, signer);
        if (!this._contract.address || !this._collateral.address) {
            throw new Error(`Error connecting to contracts. \n\
                 FPMM: ${this._contract.address} \n\
                 Collateral: ${this._collateral.address}`);
        }
    }
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
    static initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractCollateralAddress = yield contracts_1.FixedProductMarketMaker__factory.connect(marketMakerAddress, signer).collateralToken();
            if (contractCollateralAddress !== collateralAddress) {
                throw new Error("contractCollateralAddress != collateralAddress");
            }
            return new MarketMakerRepo(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress);
        });
    }
}
exports.MarketMakerRepo = MarketMakerRepo;
