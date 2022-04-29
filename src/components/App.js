import React, {  useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import Web3 from "web3";
import Electionabi from "../truffle_abis/Poll.json";


function App() {
  useEffect(() => {
    loadWeb3();
    LoadBlockchaindata();
  }, []);

  const [Currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [Electionsm, SetElectionsm] = useState();
  const [Candidate1, setCandidate1] = useState();
  const [Candidate2, setCandidate2] = useState();
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const LoadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();

    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      const candidate1 = await election.methods.candidates(1).call();
      console.log(candidate1.id);
      // const candidate1id = candidate1.id;
      // const candidate1name = candidate1.name;
      // const candidate1votecount = candidate1.voteCount;
      const candidate2 = await election.methods.candidates(2).call();
      // const candidate2id = candidate1.id;
      // const candidate2name = candidate2.name;
      // const candidate2votecount = candidate2.voteCount;
      setCandidate1(candidate1);
      setCandidate2(candidate2);
      SetElectionsm(election);
      setloader(false);
    } else {
      window.alert("the smart contract is not deployed current network. Try Ropsten Network!");
    }
  };

  const voteCandidate = async (candidateid) => {
    setloader(true);
    await Electionsm.methods
      .vote(candidateid)
      .send({ from: Currentaccount })
      .on("transactionhash", () => {
        console.log("succesfully ran");
      });
    setloader(false);
  };

  if (loader) {
    return <div className="loading"><div className="loadingContainer">
    <div className="ball1"></div>
    <div className="ball2"></div>
    <div className="ball3"></div>
    <div className="ball4"></div>
</div></div>;
  }

  return (
    <div className="App">
      <img className="image" src="../1061065.png" alt="" />
      <Navbar account={Currentaccount} />
      <Main
        candidate1={Candidate1}
        candidate2={Candidate2}
        voteCandidate={voteCandidate}
        account={Currentaccount}
      />
    </div>
  );
}

export default App;