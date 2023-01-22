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
exports.ConditionalTokensRepo = void 0;
const ethers_1 = require("ethers");
const abstract_provider_1 = require("@ethersproject/abstract-provider");
const contracts_1 = require("./contracts");
class ConditionalTokensRepo {
    /* PUBLIC PROPERTIES */
    get address() {
        return this._contract.address;
    }
    constructor(signerOrProvider, conditionalTokensAddress) {
        this.createCondition = (oracle, questionId, numOutcomes) => __awaiter(this, void 0, void 0, function* () {
            let { events } = yield this._contract
                .prepareCondition(oracle, questionId, numOutcomes, {
                gasLimit: ethers_1.BigNumber.from(1e6), //[LEM] gasLimit
            })
                .then((transaction) => transaction.wait(1));
            let { args: event } = (events || []).filter((log) => log.event === "ConditionPreparation")[0];
            if (typeof event === "undefined") {
                throw new Error("Something weird happened with events");
            }
            else {
                let { conditionId, questionId } = event;
                return conditionId;
            }
        });
        this.checkConditionExists = (conditionId) => __awaiter(this, void 0, void 0, function* () {
            let outcomeSlotCount = (yield this._contract.getOutcomeSlotCount(conditionId)).toNumber();
            return outcomeSlotCount > 0 ? true : false;
        });
        this.getBalance = (account, positionId) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.balanceOf(account, positionId);
        });
        this.getApprovalForAll = (account, operatorAddress) => __awaiter(this, void 0, void 0, function* () {
            return this._contract.isApprovedForAll(account, operatorAddress);
        });
        this.setApprovalForAll = (operatorAddress, approved) => __awaiter(this, void 0, void 0, function* () {
            if (this._signerOrProvider instanceof abstract_provider_1.Provider) {
                throw new Error("provider cannot send transactions ");
            }
            return this._contract.setApprovalForAll(operatorAddress, approved, {
                gasLimit: ethers_1.ethers.BigNumber.from(1e6), //[LEM] gasLimit
            });
        });
        this.getPositionId = (collateralAddress, conditionId, outcomeIndex) => __awaiter(this, void 0, void 0, function* () {
            const INDEX_SETS = [1, 2, 4];
            const PARENT_COLLECTION_ID = "0x" + "0".repeat(64);
            const collectionId = yield this._contract.getCollectionId(PARENT_COLLECTION_ID, conditionId, INDEX_SETS[outcomeIndex]);
            const positionId = yield this._contract.getPositionId(collateralAddress, collectionId);
            return positionId.toString();
        });
        this._signerOrProvider = signerOrProvider;
        this._contract = contracts_1.ConditionalTokens__factory.connect(conditionalTokensAddress, signerOrProvider);
        if (!this._contract.address) {
            throw new Error("Error connecting to ConditionalTokens contract.");
        }
    }
}
exports.ConditionalTokensRepo = ConditionalTokensRepo;
