/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC1155TokenReceiver,
  IERC1155TokenReceiverInterface,
} from "../IERC1155TokenReceiver";

const _abi = [
  {
    constant: true,
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "operator",
        type: "address",
      },
      {
        name: "from",
        type: "address",
      },
      {
        name: "ids",
        type: "uint256[]",
      },
      {
        name: "values",
        type: "uint256[]",
      },
      {
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        name: "",
        type: "bytes4",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "operator",
        type: "address",
      },
      {
        name: "from",
        type: "address",
      },
      {
        name: "id",
        type: "uint256",
      },
      {
        name: "value",
        type: "uint256",
      },
      {
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        name: "",
        type: "bytes4",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IERC1155TokenReceiver__factory {
  static readonly abi = _abi;
  static createInterface(): IERC1155TokenReceiverInterface {
    return new utils.Interface(_abi) as IERC1155TokenReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC1155TokenReceiver {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IERC1155TokenReceiver;
  }
}