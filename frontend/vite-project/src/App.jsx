import { useState, useEffect } from "react";

import "./App.css";
import RegisterBook from "./contracts/RegisterBook.sol/RegisterBook.json";
import { ethers } from "ethers";

function App() {
  const [contract, setContract] = useState("");
  const [account, setAccount] = useState("");

  const contractaddress = "0x6dc48bB0479b6C0b3e0eE1729bdEC5cBAF329Fca";
  const contractabi = RegisterBook.abi;

  const [id, setID] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bool, setBool] = useState(false);

  const [getid, setGetID] = useState(0);
  const [gettitle, setGetTitle] = useState("");
  const [getauthor, setGetAuthor] = useState("");

  const [recieveData, setRecieveData] = useState("");
  const [getBookFunction, setGetBookFunction] = useState("");

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractdata = new ethers.Contract(
        contractaddress,
        contractabi,
        signer
      );

      const { ethereum } = window;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setContract(contractdata);
      setAccount(accounts[0]);
    };

    init();
  }, []);

  const submitbook = async () => {
    const data = await contract.setBook(id, title, author, bool);
    // , {
    //   value: ethers.utils.parseUnits("0.000001", "ether"),
    // });
    setRecieveData(data);
  };

  const getBookData = async () => {
    const dataall = await contract.getBook(id, title, author);

    setGetBookFunction(dataall);
    console.log(dataall);
  };

  return (
    <>
      <div>{account}</div>
      <div>
        <input
          type="number"
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
        Enter id
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        Enter title
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        Enter author
        <input
          type="text"
          value={bool}
          onChange={(e) => setBool(e.target.value)}
        />
        Enter true/false
        <button onClick={submitbook}>Submit book details</button>
        <div>
          {" "}
          <input
            type="number"
            value={getid}
            onChange={(e) => setGetID(e.target.value)}
          />
          Enter id
          <input
            type="text"
            value={gettitle}
            onChange={(e) => setGetTitle(e.target.value)}
          />
          Enter title
          <input
            type="text"
            value={getauthor}
            onChange={(e) => setGetAuthor(e.target.value)}
          />
          Enter author
        </div>
        <button onClick={getBookData}>get Book data</button>
        <div>
          {!getBookFunction ? "book is not available" : "Book is  availibale"}
        </div>
      </div>
    </>
  );
}

export default App;
