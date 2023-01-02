"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC1155__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [
            {
                name: "owner",
                type: "address",
            },
            {
                name: "id",
                type: "uint256",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
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
                name: "from",
                type: "address",
            },
            {
                name: "to",
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
        name: "safeBatchTransferFrom",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "owners",
                type: "address[]",
            },
            {
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "balanceOfBatch",
        outputs: [
            {
                name: "",
                type: "uint256[]",
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
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "owner",
                type: "address",
            },
            {
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
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
                name: "from",
                type: "address",
            },
            {
                name: "to",
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
        name: "safeTransferFrom",
        outputs: [],
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
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                name: "value",
                type: "uint256",
            },
        ],
        name: "TransferSingle",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                name: "ids",
                type: "uint256[]",
            },
            {
                indexed: false,
                name: "values",
                type: "uint256[]",
            },
        ],
        name: "TransferBatch",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "value",
                type: "string",
            },
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
        ],
        name: "URI",
        type: "event",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b506100437f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b0361007a16565b6100757fd9b67a26000000000000000000000000000000000000000000000000000000006001600160e01b0361007a16565b610148565b7fffffffff00000000000000000000000000000000000000000000000000000000808216141561010b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b7fffffffff00000000000000000000000000000000000000000000000000000000166000908152602081905260409020805460ff19166001179055565b611239806101576000396000f3fe608060405234801561001057600080fd5b506004361061007c5760003560e01c80634e1273f41161005b5780634e1273f414610223578063a22cb46514610396578063e985e9c5146103c4578063f242432a146103f25761007c565b8062fdd58e1461008157806301ffc9a7146100bf5780632eb2c2d6146100fa575b600080fd5b6100ad6004803603604081101561009757600080fd5b506001600160a01b038135169060200135610485565b60408051918252519081900360200190f35b6100e6600480360360208110156100d557600080fd5b50356001600160e01b0319166104f4565b604080519115158252519081900360200190f35b610221600480360360a081101561011057600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561014357600080fd5b82018360208201111561015557600080fd5b803590602001918460208302840111600160201b8311171561017657600080fd5b919390929091602081019035600160201b81111561019357600080fd5b8201836020820111156101a557600080fd5b803590602001918460208302840111600160201b831117156101c657600080fd5b919390929091602081019035600160201b8111156101e357600080fd5b8201836020820111156101f557600080fd5b803590602001918460018302840111600160201b8311171561021657600080fd5b509092509050610513565b005b6103466004803603604081101561023957600080fd5b810190602081018135600160201b81111561025357600080fd5b82018360208201111561026557600080fd5b803590602001918460208302840111600160201b8311171561028657600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156102d557600080fd5b8201836020820111156102e757600080fd5b803590602001918460208302840111600160201b8311171561030857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506108a0945050505050565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561038257818101518382015260200161036a565b505050509050019250505060405180910390f35b610221600480360360408110156103ac57600080fd5b506001600160a01b0381351690602001351515610a07565b6100e6600480360360408110156103da57600080fd5b506001600160a01b0381358116916020013516610a75565b610221600480360360a081101561040857600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b81111561044757600080fd5b82018360208201111561045957600080fd5b803590602001918460018302840111600160201b8311171561047a57600080fd5b509092509050610aa3565b60006001600160a01b0383166104cc5760405162461bcd60e51b815260040180806020018281038252602b815260200180611083602b913960400191505060405180910390fd5b5060009081526001602090815260408083206001600160a01b03949094168352929052205490565b6001600160e01b03191660009081526020819052604090205460ff1690565b8483146105515760405162461bcd60e51b815260040180806020018281038252602e81526020018061116e602e913960400191505060405180910390fd5b6001600160a01b0387166105965760405162461bcd60e51b81526004018080602001828103825260288152602001806110ae6028913960400191505060405180910390fd5b6001600160a01b0388163314806105d557506001600160a01b038816600090815260026020908152604080832033845290915290205460ff1615156001145b6106105760405162461bcd60e51b815260040180806020018281038252603881526020018061119c6038913960400191505060405180910390fd5b60005b8581101561074057600087878381811061062957fe5b905060200201359050600086868481811061064057fe5b905060200201359050610692816001600085815260200190815260200160002060008e6001600160a01b03166001600160a01b0316815260200190815260200160002054610c7f90919063ffffffff16565b6001600084815260200190815260200160002060008d6001600160a01b03166001600160a01b03168152602001908152602001600020819055506107156001600084815260200190815260200160002060008c6001600160a01b03166001600160a01b031681526020019081526020016000205482610cdc90919063ffffffff16565b60009283526001602081815260408086206001600160a01b038f168752909152909320555001610613565b50866001600160a01b0316886001600160a01b0316336001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb898989896040518080602001806020018381038352878782818152602001925060200280828437600083820152601f01601f19169091018481038352858152602090810191508690860280828437600083820152604051601f909101601f19169092018290039850909650505050505050a461089633898989898080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050604080516020808d0282810182019093528c82529093508c92508b91829185019084908082843760009201919091525050604080516020601f8c018190048102820181019092528a815292508a9150899081908401838280828437600092019190915250610d3d92505050565b5050505050505050565b606081518351146108e25760405162461bcd60e51b815260040180806020018281038252602e815260200180611140602e913960400191505060405180910390fd5b6060835160405190808252806020026020018201604052801561090f578160200160208202803883390190505b50905060005b84518110156109ff5760006001600160a01b031685828151811061093557fe5b60200260200101516001600160a01b031614156109835760405162461bcd60e51b815260040180806020018281038252603481526020018061110c6034913960400191505060405180910390fd5b6001600085838151811061099357fe5b6020026020010151815260200190815260200160002060008683815181106109b757fe5b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020548282815181106109ec57fe5b6020908102919091010152600101610915565b509392505050565b3360008181526002602090815260408083206001600160a01b03871680855290835292819020805460ff1916861515908117909155815190815290519293927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31929181900390910190a35050565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205460ff1690565b6001600160a01b038516610ae85760405162461bcd60e51b81526004018080602001828103825260288152602001806110ae6028913960400191505060405180910390fd5b6001600160a01b038616331480610b2757506001600160a01b038616600090815260026020908152604080832033845290915290205460ff1615156001145b610b625760405162461bcd60e51b815260040180806020018281038252603881526020018061119c6038913960400191505060405180910390fd5b60008481526001602090815260408083206001600160a01b038a168452909152902054610b95908463ffffffff610c7f16565b60008581526001602090815260408083206001600160a01b038b81168552925280832093909355871681522054610bcd908490610cdc565b60008581526001602090815260408083206001600160a01b03808b16808652918452938290209490945580518881529182018790528051928a169233927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a4610c77338787878787878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f1a92505050565b505050505050565b600082821115610cd6576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b600082820183811015610d36576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b610d4f846001600160a01b031661107c565b15610c775760405163bc197c8160e01b8082526001600160a01b0388811660048401908152888216602485015260a060448501908152875160a4860152875193949289169363bc197c81938c938c938b938b938b9392916064820191608481019160c4909101906020808a01910280838360005b83811015610ddb578181015183820152602001610dc3565b50505050905001848103835286818151815260200191508051906020019060200280838360005b83811015610e1a578181015183820152602001610e02565b50505050905001848103825285818151815260200191508051906020019080838360005b83811015610e56578181015183820152602001610e3e565b50505050905090810190601f168015610e835780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b158015610ea857600080fd5b505af1158015610ebc573d6000803e3d6000fd5b505050506040513d6020811015610ed257600080fd5b50516001600160e01b03191614610c775760405162461bcd60e51b81526004018080602001828103825260368152602001806110d66036913960400191505060405180910390fd5b610f2c846001600160a01b031661107c565b15610c775760405163f23a6e6160e01b8082526001600160a01b03888116600484019081528882166024850152604484018790526064840186905260a060848501908152855160a4860152855193949289169363f23a6e61938c938c938b938b938b93929160c490910190602085019080838360005b83811015610fba578181015183820152602001610fa2565b50505050905090810190601f168015610fe75780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b15801561100a57600080fd5b505af115801561101e573d6000803e3d6000fd5b505050506040513d602081101561103457600080fd5b50516001600160e01b03191614610c775760405162461bcd60e51b81526004018080602001828103825260318152602001806111d46031913960400191505060405180910390fd5b3b15159056fe455243313135353a2062616c616e636520717565727920666f7220746865207a65726f2061646472657373455243313135353a207461726765742061646472657373206d757374206265206e6f6e2d7a65726f455243313135353a20676f7420756e6b6e6f776e2076616c75652066726f6d206f6e4552433131353542617463685265636569766564455243313135353a20736f6d65206164647265737320696e2062617463682062616c616e6365207175657279206973207a65726f455243313135353a206f776e65727320616e6420494473206d75737420686176652073616d65206c656e67746873455243313135353a2049447320616e642076616c756573206d75737420686176652073616d65206c656e67746873455243313135353a206e656564206f70657261746f7220617070726f76616c20666f7220337264207061727479207472616e73666572732e455243313135353a20676f7420756e6b6e6f776e2076616c75652066726f6d206f6e455243313135355265636569766564a265627a7a72305820b9d848affeb379787c352856fc06f134d2eb5769c22225c5d655799c49b57fad64736f6c634300050a0032";
const isSuperArgs = (xs) => xs.length > 1;
class ERC1155__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ERC1155__factory = ERC1155__factory;
ERC1155__factory.bytecode = _bytecode;
ERC1155__factory.abi = _abi;
