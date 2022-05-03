import * as React from "react";
import MegavogueIcon from "../assets/images/avatar.gif";
import PlusIcon from "../assets/images/plus-solid.svg";
import MinusIcon from "../assets/images/minus-solid.svg";
import { getContract, connectWallet, disconnectWallet } from "../utility/commonFun";
// import detectEthereumProvider from "@metamask/detect-provider";

const Container = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const toDate = new Date();
  const [nftval, setNftval] = React.useState(1);
  const [price, setPrice] = React.useState(0.15);
  const [walletStatus, setWalletStatus] = React.useState("");
  const [walletAddress, setWalletAddress] = React.useState("");
  const [totalSupply, setTotalSupply] = React.useState(3505);


  const userMint = async () => {
    const contract = await getContract();
    // console.log("contract", contract);
    try {
      console.log("nftval", nftval);
      setMintedAmount();
      let tx = await contract.mint(nftval);
      // console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickConnectWallet = async () => {
    // const provider = await detectEthereumProvider();
    // if (typeof window.ethereum == "undefined") {
    // if (!provider) {
    // alert("Please install MetaMask!")
    // } else
    if (walletAddress) userMint();
    else {
      const walletResponse = await connectWallet();
      setWalletStatus(walletResponse.status);
      setWalletAddress(walletResponse.address);
      // console.log("walletResponse.address", walletResponse.address);
    }
  };

  const onClickDisconnectWallet = async () => {
    disconnectWallet()
    setWalletAddress("");
    setWalletStatus("Disconnected from the site.");
  };

  const handleChange = (key) => {
    // console.log(key, nftval);
    if ((key === -1 && nftval > 1) || (key === 1 && nftval < 5)) {
      setNftval(nftval + key);
      setPrice(Math.round((price + key * 0.15) * 100) / 100);
    }
  };

  const setMaxprice = () => {
    setNftval(5);
    setPrice(0.75);
  };

  const setMintedAmount = () => {
    if (totalSupply < 5510) {
      setTotalSupply(totalSupply + nftval);
      return
    }
    setTotalSupply(3505)

  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      var numbers = [1, 2, 3];
      var randNum = numbers[Math.floor(Math.random() * numbers.length)];
      if (totalSupply < 7500) {
        setTotalSupply(totalSupply + randNum);
      } else {
        setTotalSupply(3505);
    }
    }, 4500);
    return () => clearInterval(interval);
  }, [totalSupply]);


  return (
    <div className="wrapper">
      <div className="container">
        <div className="container-wrapper">
          <div className="pricing-container">
            <div className="pricing pricing-title text-uppercase">
              NEKO MURA pre-sale mint
            </div>
            <div className="pricing pricing-subtitle text-capitalize">
              {days[toDate.getDay()]}, {months[toDate.getMonth()]}{" "}
              {toDate.getDate()}, {toDate.getFullYear()}
            </div>
            <div className="d-flex align-self-stretch justify-content-between">
              <div className="pricing-infor">
                <div className="pricing pricing-infor-title text-capitalize">
                  supply
                </div>
                <div className="pricing pricing-infor-description">5555</div>
              </div>
              <div className="pricing-infor">
                <div className="pricing pricing-infor-title text-capitalize">
                  price
                </div>
                <div className="pricing pricing-infor-description">0.15</div>
              </div>
              <div className="pricing-infor">
                <div className="pricing pricing-infor-title text-capitalize">
                  max
                </div>
                <div className="pricing pricing-infor-description text-capitalize">
                  5 per wallet
                </div>
              </div>
            </div>
            <div className="pricing offer-wrapper">
              <div className="offer-wrapper-title">limited sale</div>
              <div className="offer-recap">
                <div className="pricing-image-container">
                  <img
                    src={MegavogueIcon}
                    alt="megavogue"
                    className="pricing-image"
                  />
                </div>
                <div className="pricing-to-order">
                  <span className="pricing-to-order-title">Price Per NFT</span>
                  <span className="pricing-to-order-quantity">
                    0.15 ETH Each
                  </span>
                </div>
              </div>
              <div className="product-order background-light">
                <div className="d-flex align-items-center">
                  <span
                    className="mr-2 cursor-pointer"
                    onClick={() => handleChange(-1)}
                  >
                    <img src={MinusIcon} alt="-" className="svg-icon" />
                  </span>
                  <span>{nftval}</span>
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => handleChange(1)}
                  >
                    <img src={PlusIcon} alt="+" className="svg-icon" />
                  </span>
                </div>
                <button className="product-by-max" onClick={setMaxprice}>
                  Set max
                </button>
              </div>
              <div className="product-cart">
                <div className="product-cart-title">Total</div>
                <div className="product-cart-amount">{price} ETH</div>
              </div>
              <div className="d-flex flex-column align-items-center mt-4">
                <div className="d-flex justify-content-between">
                  {walletAddress && (
                    <button
                      title={walletAddress}
                      className="product-by-mint"
                      onClick={onClickDisconnectWallet}
                    >
                      disconnect
                      {/* {walletAddress.slice(0, 4) +
                      "..." +
                      walletAddress.slice(-4)} */}
                    </button>
                  )}
                  <button
                    className="product-by-mint"
                    onClick={onClickConnectWallet}
                  >
                    mint
                  </button>
                </div>
                <div className="order-offset">{totalSupply}/7777</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
