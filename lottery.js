const { ethers, Wallet } = require("ethers");

let signers = [];
const RINKEBY_RPC_URL = "https://eth-rinkeby.alchemyapi.io/v2/jIa8BT2iQJiFlbeT2j3eSZ1MzefALUMD";
let Provider = new ethers.providers.JsonRpcProvider(RINKEBY_RPC_URL);
let promiseArr = [];
let promiseArr1 = [];
let abi = [
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "numberOfWordsToReturn",
				"type": "uint32"
			}
		],
		"name": "getRandomWords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "subscriptionId",
				"type": "uint64"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "have",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "want",
				"type": "address"
			}
		],
		"name": "OnlyCoordinatorCanFulfill",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "getTicket_MoreMoneyThanRequired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "getTicket_NotEnoughMoneyForTicketFee",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "randomWords",
				"type": "uint256[]"
			}
		],
		"name": "rawFulfillRandomWords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contract_state",
		"outputs": [
			{
				"internalType": "enum Lottery.contractState",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "i_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_addressOfWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_indexOfWinner",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "s_players",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "s_randomWords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_requestId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TICKET_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let contractAddress = "0x16Cf0210f1c726487c5385F13F8BAe76Cd125C09"; 
(async ()=>{
    //Contract variables
    gasPrice = Provider.getGasPrice();
    console.log("RINKEBY_RPC_URL is: ", RINKEBY_RPC_URL);

    //Wallet_Api_array
    let wallet_APIKETS = ["a97df29e23cfcece0cc665cd501386f7dc96c354fbff4ead0888c0b6921eafb4","1ca55db940f0ba854854748dd8f3c91167e3e00ff5275e62a5ba3c1ef6362172","b327698a2bbb5e0bac5794de6c8a6f8ca563602b4b6287737d6c945eb03cf14e"]

    for(i=0; i<wallet_APIKETS.length; i++){
        let pro = await connectWallets(wallet_APIKETS[i]);
        promiseArr.push(pro);
    }
    Promise.all[promiseArr];
    console.log("All wallets connected.")
    console.log("Lenght of signers: ", signers.length)
    for(i =0 ; i< signers.length; i++){

        console.log("getting a ticket...")
        let contract = new ethers.Contract(contractAddress, abi, signers[i]);
        console.log("After connecting the contract")
        const transaction = await contract.getTicket({value: "20000000000000000"});
        console.log("AFter seding transaction")
        const transactionResponse = await transaction.wait(1);
    }
    console.log("After loop, before creating contract")
    let contract = new ethers.Contract(contractAddress, abi, signers[0]);
    console.log("Picking winner now.")
    const tx1 = await contract.getRandomWords(1);
    console.log("Req to vrf made, starting timeout.")
    setTimeout(() => {
        console.log("I'm inside set timeout")
    }, 60);  
    const tx2 = await contract.pickWinner();
    const tx2Response = await tx2.wait(1);
    console.log("tx2 is: ", tx2)
    console.log("Winner is picked.")
    let addOfWinner = await contract.s_addressOfWinner();
    console.log("Winner is: ", addOfWinner)
})();

async function connectWallets(apiKey){
    let promise1 = new Promise((resolve,reject)=>{
        const myWallet = new Wallet(apiKey);
        const signer = myWallet.connect(Provider); 
        signers.push(signer);
        resolve("");
    })
    return promise1;
}
