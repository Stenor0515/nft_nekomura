import { ethers } from "ethers";
import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  // Example with WalletConnect provider
  walletconnect: {
    cacheProvider: false,
    package: WalletConnectProvider,
    options: {
      infuraId: "9aa3d95b3bc440fa88ea12eaa4456161" // required
    }
  }
};

const contractABI = require("../contract_abi.json");

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions
});
export const getContract = async () => {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    process.env.REACT_APP_ADDRESS,
    contractABI,
    signer
  );
  return contract;
};

export const disconnectWallet = async () => {
  try {
    return await web3Modal.clearCachedProvider();
  } catch (e) {
    console.error(e);
    return false;
  }
}
export const connectWallet = async () => {
  const chainId = process.env.REACT_APP_chainId;
  try {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    if (chain === chainId) {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Your wallet is connected to the site.",
        };
      } else {
        return {
          address: "",
          status: "😥 Connect your wallet account to the site.",
        };
      }
    } else {
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
      return {
        address: "",
        status: "😥 Connect your wallet account to the site.",
      };
    }
  } catch (err) {
    return {
      address: "",
      status: "😥 " + err.message,
    };
  }
};

export const getRPCContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider()
  const contract = new ethers.Contract(process.env.REACT_APP_ADDRESS, contractABI, provider);
  return contract;
}
