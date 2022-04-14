import React, { useState } from "react";
import './main.css'

const Main = ({ candidate1, candidate2, voteCandidate, account }) => {
  const [Candidate, setCandidate] = useState("");

  const onchange = (e) => {
    setCandidate(e.target.value);
    console.log(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (Candidate.id !== 0) voteCandidate(Number(Candidate));
    else window.alert("there is error in submission");
  };

  return (
    <div className="main">

      <div className="vote">

        <h2 className="h2">Fate of the Universe depends on your vote!</h2>
        <form onSubmit={onsubmit}>
          <select name="candidate" className="form-control" onChange={onchange}>
            <option defaultValue value="">
              Select
            </option>
            <option value="1">{candidate1.name}</option>
            <option value="2">{candidate2.name}</option>
          </select>
          <button className="btn btn-primary">
            Vote {""}  {Candidate} ?
          </button>
        </form>
      </div>
      <div className="result">
        <h2>Poll Results</h2>
        <hr />

        <div>
          <div className="table">
            <p className="header">ID</p>
            <p className="header">Name</p>
            <p className="header">Votes</p>
          </div>
          <div className="table">
            <p>{candidate1.id}</p>
            <p>{candidate1.name}</p>
            <p>{candidate1.voteCount}</p>
          </div>
          <div className="table">
            <p>{candidate2.id}</p>
            <p className="pa">{candidate2.name}</p>
            <p>{candidate2.voteCount}</p>
          </div>
        </div>
      </div>
      <div className="address">
          <p > Your address is &nbsp; </p>
          <p>{account}</p>
          
        </div>
      
    </div>
  );
};

export default Main;