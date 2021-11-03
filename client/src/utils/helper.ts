import Web3 from "web3";
import w3utils from 'web3-utils'
import { NetworkResponse } from "./types";


export const toBytes32 = (key: any) => w3utils.rightPad(w3utils.asciiToHex(key), 64);

export function shortenAddress(address: string) {
  if (address.length < 5) {
    return address;
  }
  let accArr = address.split("");
  let len = accArr.length;
  let firstIndex = accArr.slice(0, 5).join("");
  let secondIndex = accArr.slice(len - 5, len).join("");
  return `${firstIndex}....${secondIndex}`;
}


export function getNetwork(netId: number): NetworkResponse {
  switch (netId) {
    case 1:
      return { name: "Ethereum Mainnet", explorerName: "Etherscan", explorerLink: "https://etherscan.io", symbol: "ETH"};
    case 4:
      return { name: "Rinkeby Testnet", explorerName: "Etherscan", explorerLink: "https://rinkeby.etherscan.io", symbol: "ETH"};
    case 5:
      return { name: "Goerli Testnet", explorerName: "Etherscan", explorerLink: "https://goerli.etherscan.io", symbol: "ETH" };
    default:
      return { name: "Unkown Network", explorerName: "", explorerLink: "", symbol: "" };
  }
}

export const signMessage = async(web3: Web3, account: string, exampleMessage: string ) => {

  try {
    const hash = toBytes32(exampleMessage);
    const sig = await web3.eth.personal.sign(hash, account,'');
    console.log(sig);
    
    return {sig, hash};

  } catch (error) {
    console.log(error);
    
  }

}