"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20Mintable__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
            {
                name: "",
                type: "string",
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
                name: "spender",
                type: "address",
            },
            {
                name: "value",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
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
        constant: false,
        inputs: [
            {
                name: "sender",
                type: "address",
            },
            {
                name: "recipient",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
            {
                name: "",
                type: "uint8",
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
                name: "spender",
                type: "address",
            },
            {
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                name: "",
                type: "bool",
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
                name: "to",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "account",
                type: "address",
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
        inputs: [],
        name: "symbol",
        outputs: [
            {
                name: "",
                type: "string",
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
                name: "spender",
                type: "address",
            },
            {
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                name: "",
                type: "bool",
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
                name: "recipient",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
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
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
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
        inputs: [
            {
                name: "name",
                type: "string",
            },
            {
                name: "symbol",
                type: "string",
            },
            {
                name: "decimals",
                type: "uint8",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
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
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
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
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50604051610ba3380380610ba38339818101604052606081101561003357600080fd5b81019080805164010000000081111561004b57600080fd5b8201602081018481111561005e57600080fd5b815164010000000081118282018710171561007857600080fd5b5050929190602001805164010000000081111561009457600080fd5b820160208101848111156100a757600080fd5b81516401000000008111828201871017156100c157600080fd5b5050602091820151855191945092508491849184916100e591600091860190610119565b5081516100f9906001906020850190610119565b506002805460ff191660ff92909216919091179055506101b49350505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061015a57805160ff1916838001178555610187565b82800160010185558215610187579182015b8281111561018757825182559160200191906001019061016c565b50610193929150610197565b5090565b6101b191905b80821115610193576000815560010161019d565b90565b6109e0806101c36000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806340c10f191161007157806340c10f191461021057806370a082311461023e57806395d89b4114610264578063a457c2d71461026c578063a9059cbb14610298578063dd62ed3e146102c4576100b4565b806306fdde03146100b9578063095ea7b31461013657806318160ddd1461017657806323b872dd14610190578063313ce567146101c657806339509351146101e4575b600080fd5b6100c16102f2565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100fb5781810151838201526020016100e3565b50505050905090810190601f1680156101285780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101626004803603604081101561014c57600080fd5b506001600160a01b038135169060200135610388565b604080519115158252519081900360200190f35b61017e61039e565b60408051918252519081900360200190f35b610162600480360360608110156101a657600080fd5b506001600160a01b038135811691602081013590911690604001356103a4565b6101ce6103fb565b6040805160ff9092168252519081900360200190f35b610162600480360360408110156101fa57600080fd5b506001600160a01b038135169060200135610404565b61023c6004803603604081101561022657600080fd5b506001600160a01b038135169060200135610440565b005b61017e6004803603602081101561025457600080fd5b50356001600160a01b031661044e565b6100c1610469565b6101626004803603604081101561028257600080fd5b506001600160a01b0381351690602001356104c9565b610162600480360360408110156102ae57600080fd5b506001600160a01b038135169060200135610505565b61017e600480360360408110156102da57600080fd5b506001600160a01b0381358116916020013516610512565b60008054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561037e5780601f106103535761010080835404028352916020019161037e565b820191906000526020600020905b81548152906001019060200180831161036157829003601f168201915b5050505050905090565b600061039533848461053d565b50600192915050565b60055490565b60006103b1848484610629565b6001600160a01b0384166000908152600460209081526040808320338085529252909120546103f19186916103ec908663ffffffff61076d16565b61053d565b5060019392505050565b60025460ff1690565b3360008181526004602090815260408083206001600160a01b038716845290915281205490916103959185906103ec908663ffffffff6107ca16565b61044a828261082b565b5050565b6001600160a01b031660009081526003602052604090205490565b60018054604080516020601f6002600019610100878916150201909516949094049384018190048102820181019092528281526060939092909183018282801561037e5780601f106103535761010080835404028352916020019161037e565b3360008181526004602090815260408083206001600160a01b038716845290915281205490916103959185906103ec908663ffffffff61076d16565b6000610395338484610629565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205490565b6001600160a01b0383166105825760405162461bcd60e51b81526004018080602001828103825260248152602001806109886024913960400191505060405180910390fd5b6001600160a01b0382166105c75760405162461bcd60e51b81526004018080602001828103825260228152602001806109416022913960400191505060405180910390fd5b6001600160a01b03808416600081815260046020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b03831661066e5760405162461bcd60e51b81526004018080602001828103825260258152602001806109636025913960400191505060405180910390fd5b6001600160a01b0382166106b35760405162461bcd60e51b815260040180806020018281038252602381526020018061091e6023913960400191505060405180910390fd5b6001600160a01b0383166000908152600360205260409020546106dc908263ffffffff61076d16565b6001600160a01b038085166000908152600360205260408082209390935590841681522054610711908263ffffffff6107ca16565b6001600160a01b0380841660008181526003602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000828211156107c4576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b600082820183811015610824576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b038216610886576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b600554610899908263ffffffff6107ca16565b6005556001600160a01b0382166000908152600360205260409020546108c5908263ffffffff6107ca16565b6001600160a01b03831660008181526003602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a3505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373a265627a7a72305820c679c2a65b8dfc78e27366d6ed7db492a59a0c193d1a24e834f879235754481364736f6c634300050a0032";
const isSuperArgs = (xs) => xs.length > 1;
class ERC20Mintable__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(name, symbol, decimals, overrides) {
        return super.deploy(name, symbol, decimals, overrides || {});
    }
    getDeployTransaction(name, symbol, decimals, overrides) {
        return super.getDeployTransaction(name, symbol, decimals, overrides || {});
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
exports.ERC20Mintable__factory = ERC20Mintable__factory;
ERC20Mintable__factory.bytecode = _bytecode;
ERC20Mintable__factory.abi = _abi;
