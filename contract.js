import web3 from "./web3";
import MarketplaceABI from "./MarketplaceABI.json"; // ABI after compiling the contract

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
const contract = new web3.eth.Contract(MarketplaceABI, CONTRACT_ADDRESS);

export default contract;
