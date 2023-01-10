/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface FixedProductMarketMakerInterface extends utils.Interface {
  functions: {
    "supportsInterface(bytes4)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "withdrawFees(address)": FunctionFragment;
    "feesWithdrawableBy(address)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "buy(uint256,uint256,uint256)": FunctionFragment;
    "calcSellAmount(uint256,uint256)": FunctionFragment;
    "conditionalTokens()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "collectedFees()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "collateralToken()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "sell(uint256,uint256,uint256)": FunctionFragment;
    "addFunding(uint256,uint256[])": FunctionFragment;
    "conditionIds(uint256)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "fee()": FunctionFragment;
    "removeFunding(uint256)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "calcBuyAmount(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "supportsInterface"
      | "approve"
      | "withdrawFees"
      | "feesWithdrawableBy"
      | "totalSupply"
      | "transferFrom"
      | "increaseAllowance"
      | "buy"
      | "calcSellAmount"
      | "conditionalTokens"
      | "balanceOf"
      | "collectedFees"
      | "decreaseAllowance"
      | "transfer"
      | "collateralToken"
      | "onERC1155BatchReceived"
      | "sell"
      | "addFunding"
      | "conditionIds"
      | "allowance"
      | "fee"
      | "removeFunding"
      | "onERC1155Received"
      | "calcBuyAmount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFees",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "feesWithdrawableBy",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "buy",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "calcSellAmount",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "conditionalTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "collectedFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "collateralToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "sell",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "addFunding",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "conditionIds",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "fee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeFunding",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "calcBuyAmount",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "feesWithdrawableBy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calcSellAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "conditionalTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collectedFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collateralToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sell", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addFunding", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "conditionIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeFunding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcBuyAmount",
    data: BytesLike
  ): Result;

  events: {
    "FPMMFundingAdded(address,uint256[],uint256)": EventFragment;
    "FPMMFundingRemoved(address,uint256[],uint256,uint256)": EventFragment;
    "FPMMBuy(address,uint256,uint256,uint256,uint256)": EventFragment;
    "FPMMSell(address,uint256,uint256,uint256,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FPMMFundingAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FPMMFundingRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FPMMBuy"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FPMMSell"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
}

export interface FPMMFundingAddedEventObject {
  funder: string;
  amountsAdded: BigNumber[];
  sharesMinted: BigNumber;
}
export type FPMMFundingAddedEvent = TypedEvent<
  [string, BigNumber[], BigNumber],
  FPMMFundingAddedEventObject
>;

export type FPMMFundingAddedEventFilter =
  TypedEventFilter<FPMMFundingAddedEvent>;

export interface FPMMFundingRemovedEventObject {
  funder: string;
  amountsRemoved: BigNumber[];
  collateralRemovedFromFeePool: BigNumber;
  sharesBurnt: BigNumber;
}
export type FPMMFundingRemovedEvent = TypedEvent<
  [string, BigNumber[], BigNumber, BigNumber],
  FPMMFundingRemovedEventObject
>;

export type FPMMFundingRemovedEventFilter =
  TypedEventFilter<FPMMFundingRemovedEvent>;

export interface FPMMBuyEventObject {
  buyer: string;
  investmentAmount: BigNumber;
  feeAmount: BigNumber;
  outcomeIndex: BigNumber;
  outcomeTokensBought: BigNumber;
}
export type FPMMBuyEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  FPMMBuyEventObject
>;

export type FPMMBuyEventFilter = TypedEventFilter<FPMMBuyEvent>;

export interface FPMMSellEventObject {
  seller: string;
  returnAmount: BigNumber;
  feeAmount: BigNumber;
  outcomeIndex: BigNumber;
  outcomeTokensSold: BigNumber;
}
export type FPMMSellEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  FPMMSellEventObject
>;

export type FPMMSellEventFilter = TypedEventFilter<FPMMSellEvent>;

export interface TransferEventObject {
  from: string;
  to: string;
  value: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface ApprovalEventObject {
  owner: string;
  spender: string;
  value: BigNumber;
}
export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  ApprovalEventObject
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface FixedProductMarketMaker extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FixedProductMarketMakerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFees(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    feesWithdrawableBy(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    buy(
      investmentAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      minOutcomeTokensToBuy: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    calcSellAmount(
      returnAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { outcomeTokenSellAmount: BigNumber }>;

    conditionalTokens(overrides?: CallOverrides): Promise<[string]>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    collectedFees(overrides?: CallOverrides): Promise<[BigNumber]>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    collateralToken(overrides?: CallOverrides): Promise<[string]>;

    onERC1155BatchReceived(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      values: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sell(
      returnAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      maxOutcomeTokensToSell: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addFunding(
      addedFunds: PromiseOrValue<BigNumberish>,
      distributionHint: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    conditionIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    fee(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeFunding(
      sharesToBurn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    onERC1155Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      value: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    calcBuyAmount(
      investmentAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  approve(
    spender: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFees(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  feesWithdrawableBy(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transferFrom(
    sender: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  increaseAllowance(
    spender: PromiseOrValue<string>,
    addedValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  buy(
    investmentAmount: PromiseOrValue<BigNumberish>,
    outcomeIndex: PromiseOrValue<BigNumberish>,
    minOutcomeTokensToBuy: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  calcSellAmount(
    returnAmount: PromiseOrValue<BigNumberish>,
    outcomeIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  conditionalTokens(overrides?: CallOverrides): Promise<string>;

  balanceOf(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  collectedFees(overrides?: CallOverrides): Promise<BigNumber>;

  decreaseAllowance(
    spender: PromiseOrValue<string>,
    subtractedValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transfer(
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  collateralToken(overrides?: CallOverrides): Promise<string>;

  onERC1155BatchReceived(
    operator: PromiseOrValue<string>,
    from: PromiseOrValue<string>,
    ids: PromiseOrValue<BigNumberish>[],
    values: PromiseOrValue<BigNumberish>[],
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sell(
    returnAmount: PromiseOrValue<BigNumberish>,
    outcomeIndex: PromiseOrValue<BigNumberish>,
    maxOutcomeTokensToSell: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addFunding(
    addedFunds: PromiseOrValue<BigNumberish>,
    distributionHint: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  conditionIds(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  allowance(
    owner: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  fee(overrides?: CallOverrides): Promise<BigNumber>;

  removeFunding(
    sharesToBurn: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  onERC1155Received(
    operator: PromiseOrValue<string>,
    from: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    value: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  calcBuyAmount(
    investmentAmount: PromiseOrValue<BigNumberish>,
    outcomeIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdrawFees(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    feesWithdrawableBy(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    buy(
      investmentAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      minOutcomeTokensToBuy: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    calcSellAmount(
      returnAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    conditionalTokens(overrides?: CallOverrides): Promise<string>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    collectedFees(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    collateralToken(overrides?: CallOverrides): Promise<string>;

    onERC1155BatchReceived(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      values: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    sell(
      returnAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      maxOutcomeTokensToSell: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    addFunding(
      addedFunds: PromiseOrValue<BigNumberish>,
      distributionHint: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    conditionIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    removeFunding(
      sharesToBurn: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    onERC1155Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      value: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    calcBuyAmount(
      investmentAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "FPMMFundingAdded(address,uint256[],uint256)"(
      funder?: PromiseOrValue<string> | null,
      amountsAdded?: null,
      sharesMinted?: null
    ): FPMMFundingAddedEventFilter;
    FPMMFundingAdded(
      funder?: PromiseOrValue<string> | null,
      amountsAdded?: null,
      sharesMinted?: null
    ): FPMMFundingAddedEventFilter;

    "FPMMFundingRemoved(address,uint256[],uint256,uint256)"(
      funder?: PromiseOrValue<string> | null,
      amountsRemoved?: null,
      collateralRemovedFromFeePool?: null,
      sharesBurnt?: null
    ): FPMMFundingRemovedEventFilter;
    FPMMFundingRemoved(
      funder?: PromiseOrValue<string> | null,
      amountsRemoved?: null,
      collateralRemovedFromFeePool?: null,
      sharesBurnt?: null
    ): FPMMFundingRemovedEventFilter;

    "FPMMBuy(address,uint256,uint256,uint256,uint256)"(
      buyer?: PromiseOrValue<string> | null,
      investmentAmount?: null,
      feeAmount?: null,
      outcomeIndex?: PromiseOrValue<BigNumberish> | null,
      outcomeTokensBought?: null
    ): FPMMBuyEventFilter;
    FPMMBuy(
      buyer?: PromiseOrValue<string> | null,
      investmentAmount?: null,
      feeAmount?: null,
      outcomeIndex?: PromiseOrValue<BigNumberish> | null,
      outcomeTokensBought?: null
    ): FPMMBuyEventFilter;

    "FPMMSell(address,uint256,uint256,uint256,uint256)"(
      seller?: PromiseOrValue<string> | null,
      returnAmount?: null,
      feeAmount?: null,
      outcomeIndex?: PromiseOrValue<BigNumberish> | null,
      outcomeTokensSold?: null
    ): FPMMSellEventFilter;
    FPMMSell(
      seller?: PromiseOrValue<string> | null,
      returnAmount?: null,
      feeAmount?: null,
      outcomeIndex?: PromiseOrValue<BigNumberish> | null,
      outcomeTokensSold?: null
    ): FPMMSellEventFilter;

    "Transfer(address,address,uint256)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): TransferEventFilter;

    "Approval(address,address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter;
  };

  estimateGas: {
    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFees(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    feesWithdrawableBy(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    buy(
      investmentAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      minOutcomeTokensToBuy: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    calcSellAmount(
      returnAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    conditionalTokens(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    collectedFees(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    collateralToken(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      values: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sell(
      returnAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      maxOutcomeTokensToSell: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addFunding(
      addedFunds: PromiseOrValue<BigNumberish>,
      distributionHint: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    conditionIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    removeFunding(
      sharesToBurn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    onERC1155Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      value: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    calcBuyAmount(
      investmentAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFees(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    feesWithdrawableBy(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferFrom(
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    buy(
      investmentAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      minOutcomeTokensToBuy: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    calcSellAmount(
      returnAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    conditionalTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    collectedFees(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transfer(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    collateralToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      values: PromiseOrValue<BigNumberish>[],
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sell(
      returnAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      maxOutcomeTokensToSell: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addFunding(
      addedFunds: PromiseOrValue<BigNumberish>,
      distributionHint: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    conditionIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeFunding(
      sharesToBurn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      value: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    calcBuyAmount(
      investmentAmount: PromiseOrValue<BigNumberish>,
      outcomeIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
