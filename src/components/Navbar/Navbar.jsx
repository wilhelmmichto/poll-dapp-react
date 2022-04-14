import "./Navbar.css";

import React, { Component } from "react";
class Navbar extends Component {



render() {
  return (
    <div className="nav">
      <div className="navleft">
        <span className="navheading">
          Marvel v DC VOTING DAPP
        </span>
      </div>
      <div className="centernav">
      <span className="navheading">
          Marvel v DC VOTING DAPP
        </span>
      </div>
      <div className="navright">
        <ul className="navul">
          <li>
            <span className="navheading">
              Account Number: {this.props.account}
            </span>
          </li>
        </ul>
      </div>
      
    </div>
  );
}
}




export default Navbar;
