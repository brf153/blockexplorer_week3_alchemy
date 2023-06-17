import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import Transactions from "./Transactions";
import Accounts from "./Accounts";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// Expand All
	const settings = {
  network: Network.ETH_MAINNET,
};
const alchemy= new Alchemy(settings)

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//

function App() {
  const [blockNumber, setBlockNumber] = useState("");
  const [blockInfo, setBlockInfo] = useState();
  const [showTransactions, setShowTransactions] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    async function getBlockNumber() {
      try {
        setBlockNumber(await alchemy.core.getBlockNumber());
      } catch {
        console.log("Could not get most recent block");
      }
    }

    async function getBlockInfo() {
      try {
        setBlockInfo(await alchemy.core.getBlock(blockNumber));
      } catch {
        console.log("Could not get block information");
      }
    }
    getBlockNumber();
    getBlockInfo();
  }, [blockNumber]);

  function getTime(timestamp) {
    let unix_timestamp = timestamp;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ":" + minutes + ":" + seconds.slice(1, 3);
    return formattedTime;
  }

  return (
    <div className="App">
      <div>
        <h1> Ethereum BlockExplorer made by <a href="https://twitter.com/ThisIsBhandari">@ThisisBhandari</a></h1>
      </div>
      <div className="intro">
        <div>
          Block Number: {blockInfo === undefined ? "Pending..." : blockNumber}
        </div>
        <br></br>
        <div>
          Block Timestamp:{" "}
          {blockInfo === undefined
            ? "Pending..."
            : getTime(blockInfo.timestamp)}
        </div>
        <br></br>
        <div>
          Amount of Transactions:{" "}
          {blockInfo === undefined
            ? "Pending..."
            : blockInfo.transactions.length}
        </div>
        <br></br>

        <div>
          Gas Used:{" "}
          {blockInfo === undefined
            ? "Pending..."
            : parseInt(blockInfo.gasUsed._hex)}
        </div>
        <br></br>
        <button
          onClick={() => {
            setBlockNumber("Pending...");
          }}
        >
          Get Latest Block
        </button>
        <button
          onClick={() => {
            setShowTransactions(!showTransactions);
          }}
        >
          Show Transactions
        </button>
        <button
          onClick={() => {
            setShowAccount(!showAccount);
          }}
        >
          Account Information
        </button>
      </div>
      {showAccount ? <Accounts /> : <div></div>}
      {showTransactions ? (
        <Transactions txs={blockInfo.transactions} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;