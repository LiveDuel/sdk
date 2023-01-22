import { ethers, BigNumber, Signer, ContractTransaction } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { ConditionalTokens, ConditionalTokens__factory } from "./contracts";

export interface ConditionalTokensRepoInterface {
    readonly address: string;

    createCondition: (oracle: string, questionId: string, numOutcomes: number) => Promise<string>;

    checkConditionExists: (conditionId: string) => Promise<boolean>;

    getBalance: (account: string, positionId: string) => Promise<BigNumber>;

    getApprovalForAll: (account: string, operatorAddress: string) => Promise<boolean>;

    setApprovalForAll: (
        operatorAddress: string,
        approved: boolean
    ) => Promise<ethers.ContractTransaction>;

    getPositionId: (
        collateralAddress: string,
        conditionId: string,
        outcomeIndex: number
    ) => Promise<string>;
}

export class ConditionalTokensRepo implements ConditionalTokensRepoInterface {
    /* PRIVATE PROPERTIES */
    private readonly _signerOrProvider: Signer | Provider;
    private readonly _contract: ConditionalTokens;

    /* PUBLIC PROPERTIES */
    get address() {
        return this._contract.address;
    }

    constructor(signerOrProvider: Signer | Provider, conditionalTokensAddress: string) {
        this._signerOrProvider = signerOrProvider;
        this._contract = ConditionalTokens__factory.connect(conditionalTokensAddress, signerOrProvider);
        if (!this._contract.address) {
            throw new Error("Error connecting to ConditionalTokens contract.");
        }
    }

    createCondition = async (
        oracle: string,
        questionId: string,
        numOutcomes: number
    ): Promise<string> => {
        let { events } = await this._contract
            .prepareCondition(oracle, questionId, numOutcomes, {
                gasLimit: BigNumber.from(1e6), //[LEM] gasLimit
            })
            .then((transaction) => transaction.wait(1));

        let { args: event } = (events || []).filter((log) => log.event === "ConditionPreparation")[0];

        if (typeof event === "undefined") {
            throw new Error("Something weird happened with events");
        } else {
            let { conditionId, questionId } = event;
            return conditionId;
        }
    };

    checkConditionExists = async (conditionId: string): Promise<boolean> => {
        let outcomeSlotCount = (await this._contract.getOutcomeSlotCount(conditionId)).toNumber();
        return outcomeSlotCount > 0 ? true : false;
    };

    getBalance = async (account: string, positionId: string): Promise<BigNumber> => {
        return this._contract.balanceOf(account, positionId);
    };

    getApprovalForAll = async (account: string, operatorAddress: string): Promise<boolean> => {
        return this._contract.isApprovedForAll(account, operatorAddress);
    };

    setApprovalForAll = async (
        operatorAddress: string,
        approved: boolean
    ): Promise<ContractTransaction> => {
        if (this._signerOrProvider instanceof Provider) {
            throw new Error("provider cannot send transactions ");
        }
        return this._contract.setApprovalForAll(operatorAddress, approved, {
            gasLimit: ethers.BigNumber.from(1e6), //[LEM] gasLimit
        });
    };

    getPositionId = async (
        collateralAddress: string,
        conditionId: string,
        outcomeIndex: number
    ): Promise<string> => {
        const INDEX_SETS = [1, 2, 4];
        const PARENT_COLLECTION_ID = "0x" + "0".repeat(64);

        const collectionId = await this._contract.getCollectionId(
            PARENT_COLLECTION_ID,
            conditionId,
            INDEX_SETS[outcomeIndex]
        );
        const positionId = await this._contract.getPositionId(collateralAddress, collectionId);
        return positionId.toString();
    };
}
