/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  LMSRMarketMakerData,
  LMSRMarketMakerDataInterface,
} from "../../LMSRMarketMakerFactory.sol/LMSRMarketMakerData";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "initialFunding",
        type: "uint256",
      },
    ],
    name: "AMMCreated",
    type: "event",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603e80601d6000396000f3fe6080604052600080fdfea265627a7a72305820e2c3300293e75d610b390862408b7be1d31e185ad35e34dbaf3df2154301a63664736f6c634300050a0032";

type LMSRMarketMakerDataConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LMSRMarketMakerDataConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LMSRMarketMakerData__factory extends ContractFactory {
  constructor(...args: LMSRMarketMakerDataConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LMSRMarketMakerData> {
    return super.deploy(overrides || {}) as Promise<LMSRMarketMakerData>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LMSRMarketMakerData {
    return super.attach(address) as LMSRMarketMakerData;
  }
  override connect(signer: Signer): LMSRMarketMakerData__factory {
    return super.connect(signer) as LMSRMarketMakerData__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LMSRMarketMakerDataInterface {
    return new utils.Interface(_abi) as LMSRMarketMakerDataInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LMSRMarketMakerData {
    return new Contract(address, _abi, signerOrProvider) as LMSRMarketMakerData;
  }
}
