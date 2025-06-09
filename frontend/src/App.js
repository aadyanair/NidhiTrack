import { useEffect, useState } from "react";
import { ethers } from "ethers";


function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContract] = useState(null);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_recipientID", "type": "string" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" },
      { "internalType": "string", "name": "_purpose", "type": "string" }
    ],
    "name": "addSubsidy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fetAllSubsidies",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "subsidyID", "type": "uint256" },
          { "internalType": "string", "name": "recipientID", "type": "string" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" },
          { "internalType": "uint256", "name": "date", "type": "uint256" },
          { "internalType": "string", "name": "purpose", "type": "string" }
        ],
        "internalType": "struct NidhiSubsidy.Subsidy[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "government",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "subsidies",
    "outputs": [
      { "internalType": "uint256", "name": "subsidyID", "type": "uint256" },
      { "internalType": "string", "name": "recipientID", "type": "string" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "date", "type": "uint256" },
      { "internalType": "string", "name": "purpose", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "subsidyCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
]

useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      setupContract();
    }
  }, [currentAccount]);


  useEffect(() => {
    if(window.ethereum){
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0){
          setCurrentAccount(accounts[0]);
        }else {
          setCurrentAccount("");
          setContract(null);
        }
      });

      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }
  },[]);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        console.log("Connected:", accounts[0]);
      } catch (error) {
        console.error("User denied wallet connection");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask");
    }
  }

  async function setupContract() {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contractInstance);
  }

  async function addNewSubsidy() {
    if(!contract) return;

    try {
      const tx = await contract.addSubsidy("recipientID123",1000,"Purpose");
      await tx.wait();
      console.log("Subsidy added!");
    } catch (error) {
      console.error("Error adding subsidy: ",error);
    }
  }

  return (
  <div>
    <h1>NidhiTrack Frontend</h1>
    {currentAccount ? (
      <>
        <p>Wallet Connected: {currentAccount}</p>
        <button onClick={addNewSubsidy}>Add Subsidy</button>  {/* THIS BUTTON */}
      </>
    ) : (
      <button onClick={connectWallet}>Connect Wallet</button>
    )}

    {/* You can add more UI here */}
  </div>
);

}

export default App;