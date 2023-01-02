/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  LMSRMarketMakerFactory,
  LMSRMarketMakerFactoryInterface,
} from "../../LMSRMarketMakerFactory.sol/LMSRMarketMakerFactory";

const _abi = [
  {
    constant: true,
    inputs: [],
    name: "implementationMaster",
    outputs: [
      {
        name: "",
        type: "address",
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
        name: "consData",
        type: "bytes",
      },
    ],
    name: "cloneConstructor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "pmSystem",
        type: "address",
      },
      {
        name: "collateralToken",
        type: "address",
      },
      {
        name: "conditionIds",
        type: "bytes32[]",
      },
      {
        name: "fee",
        type: "uint64",
      },
      {
        name: "whitelist",
        type: "address",
      },
      {
        name: "funding",
        type: "uint256",
      },
    ],
    name: "createLMSRMarketMaker",
    outputs: [
      {
        name: "lmsrMarketMaker",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        name: "lmsrMarketMaker",
        type: "address",
      },
      {
        indexed: false,
        name: "pmSystem",
        type: "address",
      },
      {
        indexed: false,
        name: "collateralToken",
        type: "address",
      },
      {
        indexed: false,
        name: "conditionIds",
        type: "bytes32[]",
      },
      {
        indexed: false,
        name: "fee",
        type: "uint64",
      },
      {
        indexed: false,
        name: "funding",
        type: "uint256",
      },
    ],
    name: "LMSRMarketMakerCreation",
    type: "event",
  },
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
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        name: "clone",
        type: "address",
      },
    ],
    name: "CloneCreated",
    type: "event",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161001d9061005f565b604051809103906000f080158015610039573d6000803e3d6000fd5b50600c80546001600160a01b0319166001600160a01b039290921691909117905561006c565b6127db8061194183390190565b6118c68061007b6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806312b4d20c1461004657806352e831dd1461006a5780637c8b2c07146100dc575b600080fd5b61004e610184565b604080516001600160a01b039092168252519081900360200190f35b6100da6004803603602081101561008057600080fd5b81019060208101813564010000000081111561009b57600080fd5b8201836020820111156100ad57600080fd5b803590602001918460018302840111640100000000831117156100cf57600080fd5b509092509050610193565b005b61004e600480360360c08110156100f257600080fd5b6001600160a01b03823581169260208101359091169181019060608101604082013564010000000081111561012657600080fd5b82018360208201111561013857600080fd5b8035906020019184602083028401116401000000008311171561015a57600080fd5b919350915067ffffffffffffffff813516906001600160a01b0360208201351690604001356105db565b600c546001600160a01b031681565b6000806060600080868660a08110156101ab57600080fd5b6001600160a01b0382358116926020810135909116918101906060810160408201356401000000008111156101df57600080fd5b8201836020820111156101f157600080fd5b8035906020019184602083028401116401000000008311171561021357600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092018290525080546001600160a01b03191633178082556040519a9f50989d50939b505067ffffffffffffffff8435169950506001600160a01b0360209093013583169750509316937f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09250839150a3600160208190527fb45820386466a8e01597d6e1efaf8f11ba4467972de5ca6c1f8aa3544ac2888e805460ff199081168317909155630271189760e51b6000527f2b11aca8aedb4d95239fb39fb7039ebbb812f8d66e5d5efc27f004162309980d805490911690911790556001600160a01b038516158015906103405750670de0b6b3a764000067ffffffffffffffff8316105b61034957600080fd5b600280546001600160a01b038088166001600160a01b0319928316179092556003805492871692909116919091179055825161038c90600490602086019061176c565b506006805467ffffffffffffffff191667ffffffffffffffff841617905560088054610100600160a81b0319166101006001600160a01b0384160217905560016005556004546040805182815260208084028201019091529080156103fb578160200160208202803883390190505b5080516104109160099160209091019061176c565b5060005b6004548110156104dd57600254600480546000926001600160a01b03169163d42dc0c2918590811061044257fe5b90600052602060002001546040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561048157600080fd5b505afa158015610495573d6000803e3d6000fd5b505050506040513d60208110156104ab57600080fd5b50516005805482029055600980549192508291849081106104c857fe5b60009182526020909120015550600101610414565b50600160055411610535576040805162461bcd60e51b815260206004820152601860248201527f636f6e646974696f6e73206d7573742062652076616c69640000000000000000604482015290519081900360640190fd5b60045460408051828152602080840282010190915290801561056b57816020015b60608152602001906001900390816105565790505b50805161058091600a916020909101906117b7565b5060045461058f9060006109b4565b6008805460ff1916600117905560075460408051918252517f631ac92e0a879a687b1bd27a7dcbf3ec0be307aa0a1046c0df4109be02c49307916020908290030190a150505050505050565b60006106b4600c60009054906101000a90046001600160a01b031689898989898960405160200180876001600160a01b03166001600160a01b03168152602001866001600160a01b03166001600160a01b03168152602001806020018467ffffffffffffffff1667ffffffffffffffff168152602001836001600160a01b03166001600160a01b031681526020018281038252868682818152602001925060200280828437600081840152601f19601f820116905080830192505050975050505050505050604051602081830303815290604052610a85565b604080516323b872dd60e01b81523360048201523060248201526044810185905290519192506001600160a01b038916916323b872dd916064808201926020929091908290030181600087803b15801561070d57600080fd5b505af1158015610721573d6000803e3d6000fd5b505050506040513d602081101561073757600080fd5b50506040805163095ea7b360e01b81526001600160a01b0383811660048301526024820185905291519189169163095ea7b3916044808201926020929091908290030181600087803b15801561078c57600080fd5b505af11580156107a0573d6000803e3d6000fd5b505050506040513d60208110156107b657600080fd5b5050604080516321fce69760e21b81526004810184905290516001600160a01b038316916387f39a5c91602480830192600092919082900301818387803b15801561080057600080fd5b505af1158015610814573d6000803e3d6000fd5b50505050806001600160a01b031663046f7da26040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561085357600080fd5b505af1158015610867573d6000803e3d6000fd5b50506040805163f2fde38b60e01b815233600482015290516001600160a01b038516935063f2fde38b9250602480830192600092919082900301818387803b1580156108b257600080fd5b505af11580156108c6573d6000803e3d6000fd5b50505050336001600160a01b03167f6867cd3ddf1a2f1ce80923be4ebe91b6cdab90ef2266e1b5c38c3e509ad0d8f8828a8a8a8a8a8960405180886001600160a01b03166001600160a01b03168152602001876001600160a01b03166001600160a01b03168152602001866001600160a01b03166001600160a01b03168152602001806020018467ffffffffffffffff1667ffffffffffffffff1681526020018381526020018281038252868682818152602001925060200280828437600083820152604051601f909101601f19169092018290039a509098505050505050505050a2979650505050505050565b816109ed57600354600b906109d2906001600160a01b031683610c54565b81546001810183556000928352602090922090910155610a81565b818060019003925050600060098381548110610a0557fe5b90600052602060002001549050600a8381548110610a1f57fe5b600091825260208083209091018054600181018255908352908220018390555b81811015610a7e57610a7684610a718560048881548110610a5c57fe5b9060005260206000200154856001901b610c98565b6109b4565b600101610a3f565b50505b5050565b60006060826040516024018080602001828103825283818151815260200191508051906020019080838360005b83811015610aca578181015183820152602001610ab2565b50505050905090810190601f168015610af75780820380516001836020036101000a031916815260200191505b5060408051601f1981840381018252928252602080820180516001600160e01b03166352e831dd60e01b17905281518351606382018082526082909201909516850190910190925295506060945090925090508015610b5d576020820181803883390190505b507f3d3d606380380380913d393d73bebebebebebebebebebebebebebebebebebebe6020820152600160601b308102602d8301527f5af4602a57600080fd5b602d8060366000396000f3363d3d373d3d3d363d73be6041830152860260608201526e5af43d82803e903d91602b57fd5bf360881b6074820152905060005b8251811015610c2957828181518110610bf057fe5b602001015160f81c60f81b828260630181518110610c0a57fe5b60200101906001600160f81b031916908160001a905350600101610bdb565b5080516020820181816000f0945050506001600160a01b038316610c4c57600080fd5b505092915050565b6040805160609390931b6bffffffffffffffffffffffff19166020808501919091526034808501939093528151808503909301835260549093019052805191012090565b6040805160208082018590528183018490528251808303840181526060909201909252805191012060009060ff81901c151582805b6000805160206118728339815191526001850893506000805160206118728339815191526003600080516020611872833981519152808788098709089050610d1481610fc7565b9150806000805160206118728339815191528384091415610ccd57828015610d3d575060028206155b80610d54575082158015610d545750600282066001145b15610d6d57816000805160206118728339815191520391505b878015610fa45760fe81901c151593506001600160fe1b031660008051602061187283398151915260036000805160206118728339815191528084850984090891506000610dba83610fc7565b9050848015610dca575060028106155b80610de1575084158015610de15750600281066001145b15610df757600080516020611872833981519152035b8260008051602061187283398151915282830914610e5c576040805162461bcd60e51b815260206004820152601c60248201527f696e76616c696420706172656e7420636f6c6c656374696f6e20494400000000604482015290519081900360640190fd5b6000606060066001600160a01b031688878686604051602001808581526020018481526020018381526020018281526020019450505050506040516020818303038152906040526040518082805190602001908083835b60208310610ed25780518252601f199092019160209182019101610eb3565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855afa9150503d8060008114610f32576040519150601f19603f3d011682016040523d82523d6000602084013e610f37565b606091505b509150915081610f7d576040805162461bcd60e51b815260206004820152600c60248201526b1958d859190819985a5b195960a21b604482015290519081900360640190fd5b808060200190516040811015610f9257600080fd5b50805160209091015190985095505050505b6002830660011415610fba57600160fe1b851894505b5092979650505050505050565b6000600080516020611872833981519152808380099150808283098181820990508181840992508183850993508184840992508183840990508181820982818309905082818209905082818209905082818309915082828609945082858609915082828309915082828509935082848509915082828309915082828309915082828509915082828609945082858609915082828309915082828309915082828609915082828509935082848609945082858609915082828309915082828509935082848509915082828309905082818209905082818209905082818309915082828609945082858509935082848509915082828309915082828309915082828609945082858609915082828309915082828609915082828309915082828309915082828609915082828509935082848509915082828309905082818209905082818309905082818509905082818209905082818209905082818209905082818209905082818309915082828609945082858609915082828609915082828509935082848509915082828509915082828309915082828309905082818309905082818209838182099050838182099050838182099050838182099050838183099150508281830991508282860994508285850993508284850991508282860994508285850993508284860994508285850993508284860994508285860991508282860991508282830991508282850993508284850991508282830991508282860994508285850993508284850991508282850991508282860994508285850993508284860994508285850993508284850991508282830991508282850991508282860994508285860991508282860991508282850993508284860994508285850993508284860994508285850993508284850991508282850991508282830991508282860994508285850993508284850991508282850991508282830991508282860994508285860991508282830990508281820990508281830990508281860990508281820990508281820990508281820990508281820990508281830991508282850993508284860994508285850993508284860994508285860991508282860991508282830991508282830991508282830991508282860991508282850993508284850991508282850991508282830991508282860994508285860991508282860991508282850993508284860994508285860991508282830991508282850993508284860994508285860991508282850993508284860994508285850993508284850991508282850991508282860994508285850993508284850991508282850991508282830991508282830991508282860994508285860991508282830991508282830991508282860991508282850993508284860994508285860991508282860990508281820990508281820990508281830991508282850993508284850991508282860994508285850993508284860994508285850993508284860994508285850993508284850991508282850990508281850991508282830991508282830991508282820991505081818509935081848409925081838509935081848409925081838509935081848509905081818509905081818409925050808284099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808384099250808383099392505050565b8280548282559060005260206000209081019282156117a7579160200282015b828111156117a757825182559160200191906001019061178c565b506117b3929150611810565b5090565b828054828255906000526020600020908101928215611804579160200282015b8281111561180457825180516117f491849160209091019061176c565b50916020019190600101906117d7565b506117b392915061182d565b61182a91905b808211156117b35760008155600101611816565b90565b61182a91905b808211156117b35760006118478282611850565b50600101611833565b508054600082559060005260206000209081019061186e9190611810565b5056fe30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47a265627a7a7230582044bfb3e8290fafd808eaef2f0da5caf712449ab1c2172f8409566392fd9a87af64736f6c634300050a003260806040819052600080546001600160a01b03191633178082556001600160a01b0316917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a36200007c7f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03620000b616565b620000b07f4e2312e0000000000000000000000000000000000000000000000000000000006001600160e01b03620000b616565b62000188565b7fffffffff0000000000000000000000000000000000000000000000000000000080821614156200014857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b7fffffffff00000000000000000000000000000000000000000000000000000000166000908152600160208190526040909120805460ff19169091179055565b61264380620001986000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c8063b0011509116100de578063d8c55af711610097578063e7f3378911610071578063e7f33789146105ae578063f23a6e61146105d5578063f2fde38b14610668578063fbde47f61461068e5761018e565b8063d8c55af714610564578063dd83bad214610581578063ddca3f43146105895761018e565b8063b0011509146103a7578063b2016bd4146103c4578063b20f8e7f146103cc578063bc197c81146103ec578063c040e6b814610530578063cb4c86b71461055c5761018e565b8063715018a61161014b57806387f39a5c1161012557806387f39a5c146103725780638da5cb5b1461038f5780638f32d59b1461039757806393e59dc11461039f5761018e565b8063715018a6146102c1578063782d085b146102c95780638456cb591461036a5761018e565b806301ffc9a714610193578063046f7da2146101ce57806305be8b2c146101d857806315bd7611146101fc57806343d726d6146102b1578063476343ee146102b9575b600080fd5b6101ba600480360360208110156101a957600080fd5b50356001600160e01b031916610696565b604080519115158252519081900360200190f35b6101d66106b5565b005b6101e0610750565b604080516001600160a01b039092168252519081900360200190f35b61029f6004803603604081101561021257600080fd5b810190602081018135600160201b81111561022c57600080fd5b82018360208201111561023e57600080fd5b803590602001918460208302840111600160201b8311171561025f57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550509135925061075f915050565b60408051918252519081900360200190f35b6101d6610e97565b61029f6110bf565b6101d6611256565b61029f600480360360208110156102df57600080fd5b810190602081018135600160201b8111156102f957600080fd5b82018360208201111561030b57600080fd5b803590602001918460208302840111600160201b8311171561032c57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506112e7945050505050565b6101d66115e5565b6101d66004803603602081101561038857600080fd5b5035611683565b6101e06119ba565b6101ba6119c9565b6101e06119da565b61029f600480360360208110156103bd57600080fd5b50356119ee565b6101e0611a0e565b61029f600480360360208110156103e257600080fd5b503560ff16611a1d565b610513600480360360a081101561040257600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561043557600080fd5b82018360208201111561044757600080fd5b803590602001918460208302840111600160201b8311171561046857600080fd5b919390929091602081019035600160201b81111561048557600080fd5b82018360208201111561049757600080fd5b803590602001918460208302840111600160201b831117156104b857600080fd5b919390929091602081019035600160201b8111156104d557600080fd5b8201836020820111156104e757600080fd5b803590602001918460018302840111600160201b8311171561050857600080fd5b509092509050611bfb565b604080516001600160e01b03199092168252519081900360200190f35b610538611c2c565b6040518082600281111561054857fe5b60ff16815260200191505060405180910390f35b61029f611c35565b61029f6004803603602081101561057a57600080fd5b5035611c3b565b61029f611c59565b610591611c5f565b6040805167ffffffffffffffff9092168252519081900360200190f35b6101d6600480360360208110156105c457600080fd5b503567ffffffffffffffff16611c6f565b610513600480360360a08110156105eb57600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b81111561062a57600080fd5b82018360208201111561063c57600080fd5b803590602001918460018302840111600160201b8311171561065d57600080fd5b509092509050611d31565b6101d66004803603602081101561067e57600080fd5b50356001600160a01b0316611d60565b610591611db3565b6001600160e01b03191660009081526001602052604090205460ff1690565b6106bd6119c9565b6106fc576040805162461bcd60e51b815260206004820181905260248201526000805160206125cc833981519152604482015290519081900360640190fd5b60018060085460ff16600281111561071057fe5b1461071a57600080fd5b6008805460ff191690556040517fb0cf596e1402e50b88a6d1097918e48922e4a2878ece11d7bb51b5d81cf6c17890600090a150565b6002546001600160a01b031681565b6000808060085460ff16600281111561077457fe5b1461077e57600080fd5b60085461010090046001600160a01b03161580610812575060085460408051633af32abf60e01b815233600482015290516101009092046001600160a01b031691633af32abf91602480820192602092909190829003018186803b1580156107e557600080fd5b505afa1580156107f9573d6000803e3d6000fd5b505050506040513d602081101561080f57600080fd5b50515b61084d5760405162461bcd60e51b815260040180806020018281038252602d81526020018061259f602d913960400191505060405180910390fd5b60055484511461085c57600080fd5b6000610867856112e7565b90506000808212156108865761087f826000036119ee565b9050610892565b61088f826119ee565b90505b60008112156108a057600080fd5b6108b0828263ffffffff611dbf16565b935084158015906108c15750848413155b806108ca575084155b6108d357600080fd5b6000821315610a0157600354604080516323b872dd60e01b81523360048201523060248201526044810187905290516001600160a01b03909216916323b872dd916064808201926020929091908290030181600087803b15801561093657600080fd5b505af115801561094a573d6000803e3d6000fd5b505050506040513d602081101561096057600080fd5b505180156109ef57506003546002546040805163095ea7b360e01b81526001600160a01b039283166004820152602481018690529051919092169163095ea7b39160448083019260209291908290030181600087803b1580156109c257600080fd5b505af11580156109d6573d6000803e3d6000fd5b505050506040513d60208110156109ec57600080fd5b50515b6109f857600080fd5b610a0182611df4565b60008090506060600554604051908082528060200260200182016040528015610a34578160200160208202803883390190505b50905060005b600554811015610a9c576000898281518110610a5257fe5b60200260200101511215610a945760019250888181518110610a7057fe5b6020026020010151600003828281518110610a8757fe5b6020026020010181815250505b600101610a3a565b508115610bb557600254604051631759616b60e11b81523360048201818152306024840181905260a060448501908152600b805460a487018190526001600160a01b0390971696632eb2c2d696939491938993916064820191608481019160c49091019087908015610b2d57602002820191906000526020600020905b815481526020019060010190808311610b19575b50508481038352855181528551602091820191808801910280838360005b83811015610b63578181015183820152602001610b4b565b50505050905001848103825260008152602001602001975050505050505050600060405180830381600087803b158015610b9c57600080fd5b505af1158015610bb0573d6000803e3d6000fd5b505050505b6000841215610bca57610bca84600003611f7f565b336001600160a01b03167fda7ff5556ce7ecfcf06296f03426e8c02a7305b85cfd88816a32f7f4969051778986866040518080602001848152602001838152602001828103825285818151815260200191508051906020019060200280838360005b83811015610c44578181015183820152602001610c2c565b5050505090500194505050505060405180910390a260009150815b600554811015610cdd576000898281518110610c7757fe5b60200260200101511315610cba5760019250888181518110610c9557fe5b6020026020010151828281518110610ca957fe5b602002602001018181525050610cd5565b6000828281518110610cc857fe5b6020026020010181815250505b600101610c5f565b508115610df657600254604051631759616b60e11b81523060048201818152336024840181905260a060448501908152600b805460a487018190526001600160a01b0390971696632eb2c2d696939491938993916064820191608481019160c49091019087908015610d6e57602002820191906000526020600020905b815481526020019060010190808311610d5a575b50508481038352855181528551602091820191808801910280838360005b83811015610da4578181015183820152602001610d8c565b50505050905001848103825260008152602001602001975050505050505050600060405180830381600087803b158015610ddd57600080fd5b505af1158015610df1573d6000803e3d6000fd5b505050505b6000861215610e8c576003546040805163a9059cbb60e01b81523360048201526000898103602483015291516001600160a01b039093169263a9059cbb92604480840193602093929083900390910190829087803b158015610e5757600080fd5b505af1158015610e6b573d6000803e3d6000fd5b505050506040513d6020811015610e8157600080fd5b5051610e8c57600080fd5b505050505092915050565b610e9f6119c9565b610ede576040805162461bcd60e51b815260206004820181905260248201526000805160206125cc833981519152604482015290519081900360640190fd5b600060085460ff166002811115610ef157fe5b1480610f0d5750600160085460ff166002811115610f0b57fe5b145b610f485760405162461bcd60e51b81526004018080602001828103825260238152602001806125ec6023913960400191505060405180910390fd5b60005b600554811015611086576000610f60826120f6565b6002549091506001600160a01b031663f242432a30610f7d6119ba565b60025460408051627eeac760e11b815230600482015260248101889052905187926001600160a01b03169162fdd58e916044808301926020929190829003018186803b158015610fcc57600080fd5b505afa158015610fe0573d6000803e3d6000fd5b505050506040513d6020811015610ff657600080fd5b5051604080516001600160e01b031960e088901b1681526001600160a01b0395861660048201529390941660248401526044830191909152606482015260a06084820152600060a48201819052915160e4808301939282900301818387803b15801561106157600080fd5b505af1158015611075573d6000803e3d6000fd5b505060019093019250610f4b915050565b506008805460ff191660021790556040517f6e18b1b14477b5922c6efa82206ed0e3b73c2500e8d1528c9a6e17554ea1255490600090a1565b60006110c96119c9565b611108576040805162461bcd60e51b815260206004820181905260248201526000805160206125cc833981519152604482015290519081900360640190fd5b600354604080516370a0823160e01b815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b15801561115357600080fd5b505afa158015611167573d6000803e3d6000fd5b505050506040513d602081101561117d57600080fd5b50516003549091506001600160a01b031663a9059cbb61119b6119ba565b836040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b1580156111eb57600080fd5b505af11580156111ff573d6000803e3d6000fd5b505050506040513d602081101561121557600080fd5b505161122057600080fd5b6040805182815290517fce1d35d26fbf6b3cc5cd924de10b5a52b08e484129ea7d93abc48d739fffe5b99181900360200190a190565b61125e6119c9565b61129d576040805162461bcd60e51b815260206004820181905260248201526000805160206125cc833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60006005548251146112f857600080fd5b6060600554604051908082528060200260200182016040528015611326578160200160208202803883390190505b50905060005b600554811015611422576002546000906001600160a01b031662fdd58e30611353856120f6565b6040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b031681526020018281526020019250505060206040518083038186803b1580156113a057600080fd5b505afa1580156113b4573d6000803e3d6000fd5b505050506040513d60208110156113ca57600080fd5b5051905060008112156113dc57600080fd5b611402818684815181106113ec57fe5b602002602001015161211790919063ffffffff16565b83838151811061140e57fe5b60209081029190910101525060010161132c565b50600073461021023ed36efe6c696374e8e5f4c57f3d0cd063137bf798600160401b6005540260016040518363ffffffff1660e01b81526004018083815260200182600281111561146f57fe5b60ff1681526020019250505060206040518083038186803b15801561149357600080fd5b505af41580156114a7573d6000803e3d6000fd5b505050506040513d60208110156114bd57600080fd5b505190506000806114d18385836001612145565b506040805163026f7ef360e31b81526004810184905260016024820152905192945090925073461021023ed36efe6c696374e8e5f4c57f3d0cd09163137bf79891604480820192602092909190829003018186803b15801561153257600080fd5b505af4158015611546573d6000803e3d6000fd5b505050506040513d602081101561155c57600080fd5b50519450611570858263ffffffff611dbf16565b6007549095506115a3908461158f88600160401b63ffffffff61237516565b8161159657fe5b059063ffffffff61237516565b94506000851315806115bc575084600160401b80820502145b156115cf57600160401b850594506115dc565b600160401b850560010194505b50505050919050565b6115ed6119c9565b61162c576040805162461bcd60e51b815260206004820181905260248201526000805160206125cc833981519152604482015290519081900360640190fd5b60008060085460ff16600281111561164057fe5b1461164a57600080fd5b6008805460ff191660011790556040517fbb11914e7a395f00cf0920fe85f50088bd8d7681529fb0bd3c27ccb45a8bcd8f90600090a150565b61168b6119c9565b6116ca576040805162461bcd60e51b815260206004820181905260248201526000805160206125cc833981519152604482015290519081900360640190fd5b60018060085460ff1660028111156116de57fe5b146116e857600080fd5b8161173a576040805162461bcd60e51b815260206004820152601f60248201527f66756e64696e67206368616e6765206d757374206265206e6f6e2d7a65726f00604482015290519081900360640190fd5b60008213156118b257600354604080516323b872dd60e01b81523360048201523060248201526044810185905290516001600160a01b03909216916323b872dd916064808201926020929091908290030181600087803b15801561179d57600080fd5b505af11580156117b1573d6000803e3d6000fd5b505050506040513d60208110156117c757600080fd5b5051801561185657506003546002546040805163095ea7b360e01b81526001600160a01b039283166004820152602481018690529051919092169163095ea7b39160448083019260209291908290030181600087803b15801561182957600080fd5b505af115801561183d573d6000803e3d6000fd5b505050506040513d602081101561185357600080fd5b50515b61185f57600080fd5b61186882611df4565b60075461187b908363ffffffff6123b616565b6007556040805183815290517fc55e9a33fb8b1de5318b5c7b96a32937e54006c82000b2c468ed1fb9f73f67999181900360200190a15b60008212156119b6576118c782600003611f7f565b6007546118de90600084900363ffffffff61241716565b6007556003546001600160a01b031663a9059cbb6118fa6119ba565b846000036040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561194d57600080fd5b505af1158015611961573d6000803e3d6000fd5b505050506040513d602081101561197757600080fd5b505161198257600080fd5b6040805183815290517fc55e9a33fb8b1de5318b5c7b96a32937e54006c82000b2c468ed1fb9f73f67999181900360200190a15b5050565b6000546001600160a01b031690565b6000546001600160a01b0316331490565b60085461010090046001600160a01b031681565b600654670de0b6b3a764000067ffffffffffffffff909116919091020490565b6003546001600160a01b031681565b60006060600554604051908082528060200260200182016040528015611a4d578160200160208202803883390190505b50905060005b600554811015611b27576002546000906001600160a01b031662fdd58e30611a7a856120f6565b6040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b031681526020018281526020019250505060206040518083038186803b158015611ac757600080fd5b505afa158015611adb573d6000803e3d6000fd5b505050506040513d6020811015611af157600080fd5b505160009081039150811315611b0657600080fd5b80838381518110611b1357fe5b602090810291909101015250600101611a53565b50600073461021023ed36efe6c696374e8e5f4c57f3d0cd063137bf798600160401b84510260026040518363ffffffff1660e01b815260040180838152602001826002811115611b7357fe5b60ff1681526020019250505060206040518083038186803b158015611b9757600080fd5b505af4158015611bab573d6000803e3d6000fd5b505050506040513d6020811015611bc157600080fd5b50519050600080611bd58385886002612145565b9250509150600160401b8281611be757fe5b048181611bf057fe5b049695505050505050565b60006001600160a01b038916301415611c1c575063bc197c8160e01b611c20565b5060005b98975050505050505050565b60085460ff1681565b60075481565b60048181548110611c4857fe5b600091825260209091200154905081565b60055481565b60065467ffffffffffffffff1681565b611c776119c9565b611cb6576040805162461bcd60e51b815260206004820181905260248201526000805160206125cc833981519152604482015290519081900360640190fd5b60018060085460ff166002811115611cca57fe5b14611cd457600080fd5b6006805467ffffffffffffffff191667ffffffffffffffff848116919091179182905560408051929091168252517f43acfe4f4a14c012959016586aee3b318a0a30e17bb8edae05a58d46c80b4199916020908290030190a15050565b60006001600160a01b038716301415611d52575063f23a6e6160e01b611d56565b5060005b9695505050505050565b611d686119c9565b611da7576040805162461bcd60e51b815260206004820181905260248201526000805160206125cc833981519152604482015290519081900360640190fd5b611db081612474565b50565b670de0b6b3a764000081565b81810160008212801590611dd35750828112155b80611de85750600082128015611de857508281125b611dee57fe5b92915050565b600454600019015b600081126119b6576060611e2660098381548110611e1657fe5b9060005260206000200154612514565b905060005b600a8381548110611e3857fe5b600091825260209091200154811015611f7457600254600354600a80546001600160a01b03938416936372ce42759316919087908110611e7457fe5b906000526020600020018481548110611e8957fe5b906000526020600020015460048781548110611ea157fe5b906000526020600020015486896040518663ffffffff1660e01b815260040180866001600160a01b03166001600160a01b0316815260200185815260200184815260200180602001838152602001828103825284818151815260200191508051906020019060200280838360005b83811015611f27578181015183820152602001611f0f565b505050509050019650505050505050600060405180830381600087803b158015611f5057600080fd5b505af1158015611f64573d6000803e3d6000fd5b505060019092019150611e2b9050565b505060001901611dfc565b60005b6004548110156119b6576060611f9e60098381548110611e1657fe5b905060005b600a8381548110611fb057fe5b6000918252602090912001548110156120ec57600254600354600a80546001600160a01b0393841693639e7212ad9316919087908110611fec57fe5b90600052602060002001848154811061200157fe5b90600052602060002001546004878154811061201957fe5b906000526020600020015486896040518663ffffffff1660e01b815260040180866001600160a01b03166001600160a01b0316815260200185815260200184815260200180602001838152602001828103825284818151815260200191508051906020019060200280838360005b8381101561209f578181015183820152602001612087565b505050509050019650505050505050600060405180830381600087803b1580156120c857600080fd5b505af11580156120dc573d6000803e3d6000fd5b505060019092019150611fa39050565b5050600101611f82565b6000600b828154811061210557fe5b90600052602060002001549050919050565b8082036000821280159061212b5750828113155b80611de85750600082128015611de85750828113611dee57fe5b600080600080871215801561215d5750600060075412155b61216657600080fd5b6040516333304e0560e21b815260206004820181815288516024840152885173461021023ed36efe6c696374e8e5f4c57f3d0cd09363ccc13814938b9392839260440191808601910280838360005b838110156121cd5781810151838201526020016121b5565b505050509050019250505060206040518083038186803b1580156121f057600080fd5b505af4158015612204573d6000803e3d6000fd5b505050506040513d602081101561221a57600080fd5b5051600754909250612232838963ffffffff61237516565b8161223957fe5b0591506122558268b8000000000000000063ffffffff61211716565b91506000805b87518160ff1610156123695773461021023ed36efe6c696374e8e5f4c57f3d0cd0631d5801236122c5866007546122b18e8e8860ff168151811061229b57fe5b602002602001015161237590919063ffffffff16565b816122b857fe5b059063ffffffff61211716565b886040518363ffffffff1660e01b8152600401808381526020018260028111156122eb57fe5b60ff1681526020019250505060206040518083038186803b15801561230f57600080fd5b505af4158015612323573d6000803e3d6000fd5b505050506040513d602081101561233957600080fd5b5051915060ff818116908816141561234f578192505b61235f858363ffffffff6123b616565b945060010161225b565b50509450945094915050565b60008261238457506000611dee565b508181026000198314158061239d5750600160ff1b8214155b8015611de85750818382816123ae57fe5b0514611dee57fe5b600082820183811015612410576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b60008282111561246e576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6001600160a01b0381166124b95760405162461bcd60e51b81526004018080602001828103825260268152602001806125796026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b606081604051908082528060200260200182016040528015612540578160200160208202803883390190505b50905060005b8281101561257257806001901b82828151811061255f57fe5b6020908102919091010152600101612546565b5091905056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573736f6e6c792077686974656c6973746564207573657273206d61792063616c6c20746869732066756e6374696f6e4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657254686973204d61726b65742068617320616c7265616479206265656e20636c6f736564a265627a7a7230582060925d5ed74ede0b781b497f283c0d93725f60f9845651828e2741c46d62a0be64736f6c634300050a0032";

type LMSRMarketMakerFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LMSRMarketMakerFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LMSRMarketMakerFactory__factory extends ContractFactory {
  constructor(...args: LMSRMarketMakerFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LMSRMarketMakerFactory> {
    return super.deploy(overrides || {}) as Promise<LMSRMarketMakerFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LMSRMarketMakerFactory {
    return super.attach(address) as LMSRMarketMakerFactory;
  }
  override connect(signer: Signer): LMSRMarketMakerFactory__factory {
    return super.connect(signer) as LMSRMarketMakerFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LMSRMarketMakerFactoryInterface {
    return new utils.Interface(_abi) as LMSRMarketMakerFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LMSRMarketMakerFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LMSRMarketMakerFactory;
  }
}