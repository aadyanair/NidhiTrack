import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

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
      alert("MetaMask not detected. Please install MetaMask.");
    }
  }

  return (
    <div>
      <h1>NidhiTrack Frontend</h1>
      {currentAccount ? (
        <p>Wallet Connected: {currentAccount}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
