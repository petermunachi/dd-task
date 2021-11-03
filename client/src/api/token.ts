import Web3 from "web3";
import TruffleContract from "@truffle/contract";
import token from "../contracts/Token.json";


// @ts-ignore
const Token = TruffleContract(token);



export async function getBalance(web3: Web3, account: string): Promise<number> {
  Token.setProvider(web3.currentProvider);

  const token = await Token.deployed();
  
  const total = await token.balanceOf(account);  

  return total;

}



export async function getTokenAddress(web3: Web3): Promise<string> {
  Token.setProvider(web3.currentProvider);
  const token = await Token.deployed();
  return token.address;
  
}
