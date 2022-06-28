const { ethers, Wallet } = require("ethers");

(async ()=>{

    //Take the source code of the contract, paste to remix, compile it
    //Get the abi of the contract from remix after compiling
    let abi = [
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
            "name": "contract_state",
            "outputs": [
                {
                    "internalType": "enum magic8.contractState",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "numberOfWords",
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
            "name": "magic8Response",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
            "name": "magic8_data",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "prediction",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "response",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
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
            "name": "rollBall",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "s_ballRoll",
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
        }
    ]
    let contractAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";

    //An endpoint to connect to blockchain
    //Identity of endpoint matters only if you want to track calls ( later stages )
    const RINKEBY_RPC_URL = "https://eth-rinkeby.alchemyapi.io/v2/jIa8BT2iQJiFlbeT2j3eSZ1MzefALUMD";
    
    let Provider = new ethers.providers.JsonRpcProvider(RINKEBY_RPC_URL);

    //Connecting Wallet
    console.log("Conencting contract to wallet")
    const private_key = "a97df29e23cfcece0cc665cd501386f7dc96c354fbff4ead0888c0b6921eafb4";
    const myWallet = new Wallet(private_key);
    const signer = myWallet.connect(Provider);

    let contract = new ethers.Contract(contractAddress, abi, signer);
    
    console.log("Attempting to rollball");
    const transaction = await contract.rollBall();
    console.log("transaction is: ", transaction)
    console.log("Ball rolled")

})();




