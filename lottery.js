const { ethers, Wallet } = require("ethers");

(async ()=>{
    //Contract variables
    let signers = [];
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
        }
    ]
    let contractAddress = "0xe242c8c0a2855B14bC9e760129C4D81acb110f08"; 
    
    const RINKEBY_RPC_URL = "https://eth-rinkeby.alchemyapi.io/v2/jIa8BT2iQJiFlbeT2j3eSZ1MzefALUMD";
    let Provider = new ethers.providers.JsonRpcProvider(RINKEBY_RPC_URL);
    gasPrice = Provider.getGasPrice();
    console.log("RINKEBY_RPC_URL is: ", RINKEBY_RPC_URL);

    //Wallet 1
    let my_wallet_address = "0x572CE1Be0e81ef59754ad57d49234D156a6c2D44"
    let my_api_key = "a97df29e23cfcece0cc665cd501386f7dc96c354fbff4ead0888c0b6921eafb4"
    const myWallet = new Wallet(my_api_key);
    const signer = myWallet.connect(Provider)
    signers.push(signer);
    console.log("Wallet 1 connected")

    //Wallet 2
    let my_wallet_address1 = "0xeA22966B11A0efE3aa0537eE4A9dA36ab9B9febA"
    let my_api_key1 = "1ca55db940f0ba854854748dd8f3c91167e3e00ff5275e62a5ba3c1ef6362172"
    const myWallet1 = new Wallet(my_api_key1);
    const signer1 = myWallet1.connect(Provider)
    signers.push(signer1);
    console.log("Wallet 2 connected")

    //Wallet 3
    let my_wallet_address2 = "0x742aA3AD704eBdD1C2D1172d8d4Ddb5A9aff0d53"
    let my_api_key2 = "b327698a2bbb5e0bac5794de6c8a6f8ca563602b4b6287737d6c945eb03cf14e"
    const myWallet2 = new Wallet(my_api_key2);
    const signer2 = myWallet2.connect(Provider)    
    signers.push(signer2);
    console.log("Wallet 3 connected")

    for(i =0 ; i< signers.length; i++){
        console.log("getting a ticket...")
        let contract = new ethers.Contract(contractAddress, abi, signers[i]);
        const transaction = await contract.getTicket({value: 50});
        const transactionResponse = await transaction.wait(1);
    }
    let contract = new ethers.Contract(contractAddress, abi, signers[0]);


    let address = await contract.s_players(0);
    let address1 = await contract.s_players(1);
    let address2 = await contract.s_players(2);
    console.log("Address is:", address);
    console.log("Address1 is:", address1);
    console.log("Address2 is:", address2);

})();
