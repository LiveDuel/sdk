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
const bignumber_js_1 = require("bignumber.js");
const conditionalTokens_1 = require("./conditionalTokens");
const contracts_1 = require("./contracts");
class MarketMakerFactoryRepo {
    constructor(signer, marketMakerFactoryAddress) {
        this.createLMSRMarketMaker = (collateralAddress, conditionalTokensAddress, conditionId, fee, funding) => __awaiter(this, void 0, void 0, function* () {
            const tx = yield (yield this._contract.createLMSRMarketMaker(conditionalTokensAddress, collateralAddress, [conditionId], fee, ethers_1.ethers.constants.AddressZero, funding, {
                gasLimit: ethers_1.BigNumber.from(1e6),
            })).wait(1);
            let deployedMarketAddress = undefined;
            tx.events &&
                tx.events.map((event) => {
                    if (event.event == "LMSRMarketMakerCreation" && event.args !== undefined) {
                        deployedMarketAddress = event.args["lmsrMarketMaker"];
                    }
                });
            if (deployedMarketAddress !== undefined) {
                return deployedMarketAddress;
            }
            else {
                console.error(JSON.stringify(tx, null, 2));
                throw new Error("No LMSRMarketMakerCreation Event fired. Please check the TX above.\nPossible causes for failure:\n- ABIs outdated. Delete the build/ folder\n- Transaction failure\n- Unfunded LMSR");
            }
        });
        this._contract = contracts_1.LMSRMarketMakerFactory__factory.connect(marketMakerFactoryAddress, signer);
        if (!this._contract.address) {
            throw new Error("Error connecting to LMSRMarketMakerFactory contract.");
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
        this.calcNetCostRemote = (outcomeTokenAmounts) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.calcNetCost(outcomeTokenAmounts);
        });
        this.calcPriceRemote = (outcomeTokenIndex) => __awaiter(this, void 0, void 0, function* () {
            const DECIMALS = 18;
            const marginalPrice = new bignumber_js_1.BigNumber((yield this._contract.calcMarginalPrice(outcomeTokenIndex)).toString());
            const price = marginalPrice.dividedBy(new bignumber_js_1.BigNumber(10).pow(DECIMALS));
            const probability = marginalPrice.dividedBy(new bignumber_js_1.BigNumber(2).pow(64));
            return [price.toNumber(), probability.toNumber()];
        });
        this.trade = (tokenAmounts, collateralLimit, from) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.trade(tokenAmounts, collateralLimit, {
                from,
                gasLimit: ethers_1.ethers.BigNumber.from(1e6), //[LEM] gasLimit
            });
        });
        this.getCollateralBalance = (account) => __awaiter(this, void 0, void 0, function* () {
            return this._collateral.balanceOf(account);
        });
        this.setCollateralApproval = (amount, from) => __awaiter(this, void 0, void 0, function* () {
            return this._collateral.approve(this.contractAddress, amount, {
                from,
                gasLimit: ethers_1.ethers.BigNumber.from(1e6), //[LEM] gasLimit
            });
        });
        this.getConditionalTokenApproval = (account) => __awaiter(this, void 0, void 0, function* () {
            return this._conditionalTokens.getApprovalForAll(account, this.contractAddress);
        });
        this.setConditionalTokenApproval = (approved, from) => __awaiter(this, void 0, void 0, function* () {
            return this._conditionalTokens.setApprovalForAll(this.contractAddress, approved, from);
        });
        this._conditionalTokens = new conditionalTokens_1.ConditionalTokensRepo(signer, conditionalTokensAddress);
        this._contract = contracts_1.LMSRMarketMaker__factory.connect(marketMakerAddress, signer);
        this._collateral = contracts_1.ERC20__factory.connect(collateralAddress, signer);
        if (!this._contract.address || !this._collateral.address) {
            throw new Error(`Error connecting to contracts. \n\
                 LMSRMM: ${this._contract.address} \n\
                 Collateral: ${this._collateral.address}`);
        }
    }
    /**
     * Safely initializes the MarketMakerRepo class checking if the collateralAddress mentioned
     * is the same collateral used by the market.
     * @param signer Signer to use to deploy market
     * @param marketMakerAddress Address of the deployed LMSRMarketMaker contract
     * @param conditionalTokensAddress Address of the deployed ConditionalTokens contract
     * @param collateralAddress Address of the collateral token contract
     * @returns MarketMakerRepo class instance
     */
    static initialize(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractCollateralAddress = yield contracts_1.LMSRMarketMaker__factory.connect(marketMakerAddress, signer).collateralToken();
            if (contractCollateralAddress !== collateralAddress) {
                throw new Error("contractCollateralAddress != collateralAddress");
            }
            return new MarketMakerRepo(signer, marketMakerAddress, conditionalTokensAddress, collateralAddress);
        });
    }
}
exports.MarketMakerRepo = MarketMakerRepo;
