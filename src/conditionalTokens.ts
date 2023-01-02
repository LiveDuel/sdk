import { BigNumber, BigNumberish, ethers, Signer } from "ethers";
import { ConditionalTokens, ConditionalTokens__factory } from "./contracts";
import { Outcome } from "./utils";

export interface ConditionalTokensRepoInterface {
    readonly address: string;

    createCondition: (oracle: string, questionId: string, outcomes: Outcome[]) => Promise<string>;

    checkConditionExists: (conditionId: string) => Promise<boolean>;

    getApprovalForAll: (account: string, operatorAddress: string) => Promise<boolean>;

    setApprovalForAll: (
        operatorAddress: string,
        approved: boolean,
        from: string
    ) => Promise<ethers.ContractTransaction>;
}

export class ConditionalTokensRepo implements ConditionalTokensRepoInterface {
    /* PRIVATE PROPERTIES */
    private readonly _contract: ConditionalTokens;

    /* PUBLIC PROPERTIES */
    get address() {
        return this._contract.address;
    }

    constructor(signer: Signer, conditionalTokensAddress: string) {
        this._contract = ConditionalTokens__factory.connect(conditionalTokensAddress, signer);
        if (!this._contract.address) {
            throw new Error("Error connecting to ConditionalTokens contract.");
        }
    }

    createCondition = async (
        oracle: string,
        questionId: string,
        outcomes: Outcome[]
    ): Promise<string> => {
        let { events } = await this._contract
            .prepareCondition(oracle, questionId, outcomes.length, {
                gasLimit: BigNumber.from(1e6),
            })
            .then((transaction) => transaction.wait(1));

        let { args: event } = (events || []).filter(
            (log) => log.event === "ConditionPreparation"
        )[0];

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

    getApprovalForAll = async (account: string, operatorAddress: string): Promise<boolean> => {
        return this._contract.isApprovedForAll(account, operatorAddress);
    };

    setApprovalForAll = async (
        operatorAddress: string,
        approved: boolean,
        from: string
    ): Promise<ethers.ContractTransaction> => {
        return this._contract.setApprovalForAll(operatorAddress, approved, { from });
    };
}
