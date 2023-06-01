import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Message from "../../utils/Message.json";

const deployedContract = "0xcd3ce48aC23D4A34749FaCF2CCC77A89D9400818";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [input, setInput] = useState("");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    connectWallet();
    getMessage();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  const setMessage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        deployedContract,
        Message.abi,
        signer
      );
      try {
        const response = await contract.setMessage(input);
        console.log(response);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
  };

  const getMessage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        deployedContract,
        Message.abi,
        signer
      );
      try {
        const response = await contract.getMessage();
        setMsg(response);
        console.log(response);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <p>{msg}</p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <small style={{ fontSize: "0.6em" }}>i luv Lawson 💖</small>
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          paddingTop: "1rem",
        }}
      >
        <button onClick={setMessage}>set message</button>
        <button onClick={getMessage}>get message</button>
      </div>
    </div>
  );
}
