import "./App.css";
import { Navbar, Container, Footer } from "./component";

// export const getContract = async () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();

//   const contractABI = require("./contract_abi.json");
//   const contract = new ethers.Contract(
//     process.env.REACT_APP_ADDRESS,
//     contractABI,
//     signer
//   );
//   console.log("----------presale info-----=--------");
//   let name = await contract.presale_info();
//   console.log(name.sale_token);
//   console.log("---------------===----------");
//   return contract;
// };

function App() {
  // const onClickConnectWallet = async () => {
  //   const walletResponse = await connectWallet();
  //   setWalletStatus(walletResponse.status);
  //   setWalletAddress(walletResponse.address);
  // };

  // const onClickDisconnectWallet = async () => {
  //   setWalletAddress("");
  //   setWalletStatus("Disconnected from the site.");
  // };

  // const getBalance = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   let result = await signer.getBalance();
  //   result = ethers.utils.formatUnits(result);
  //   setBalance(result);

  //   return result;
  // };
  return (
    <div className="App">
      <Navbar />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
