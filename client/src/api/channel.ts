import Web3 from "web3";
import BN from "bn.js";
import TruffleContract from "@truffle/contract";
import channel from "../contracts/Channel.json";
import { getBalance, getTokenAddress } from "./token";

// @ts-ignore
const Channel = TruffleContract(channel);

interface GetResponse {
  channelAddress: string;
  tokenAddress: string;
  balances: string[];
  owners: string[];
  nonce: number;
}

export async function get(web3: Web3): Promise<GetResponse> {
  Channel.setProvider(web3.currentProvider);

  const channel = await Channel.deployed();
  
  const owners = await channel.getOwners();
  const nonce = (await channel.processedNonces()).toString();
  const balances = await getBalances(web3);

  const token = await getTokenAddress(web3);


  const data: GetResponse = {
    channelAddress: channel.address,
    tokenAddress: token,
    balances,
    owners,
    nonce: parseInt(nonce)
  }  

  return data;


}

export async function getOwners(web3: Web3): Promise<string[]> {
  Channel.setProvider(web3.currentProvider);

  const channel = await Channel.deployed();
  
  const owners = await channel.getOwners();

  console.log({owners});
  
  return owners;

}

export async function getNonce(web3: Web3): Promise<number> {
  Channel.setProvider(web3.currentProvider);

  const channel = await Channel.deployed();
  
  const nonce = (await channel.processedNonces()).toString();
  

  return parseInt(nonce);

}

export async function getBalances(web3: Web3): Promise<string[]> {
  Channel.setProvider(web3.currentProvider);

  const channel = await Channel.deployed();
  
  const [owner1, owner2] = await getOwners(web3);

  let balance1 = (await getBalance(web3, owner1)).toString();
  let balance2 = (await getBalance(web3, owner2)).toString();

  balance1 = web3.utils.fromWei(balance1, 'ether');
  balance2 = web3.utils.fromWei(balance2, 'ether');

  return [`${balance1} Ethers`, `${balance2} Ethers`];

}

export async function checkOwner(web3: Web3, owner: string): Promise<boolean> {
   Channel.setProvider(web3.currentProvider);

   const channel = await Channel.deployed();

   const isOwner = await channel.isOwner(owner);

   return isOwner;

}

export async function getChannelAddress(web3: Web3): Promise<string> {
  Channel.setProvider(web3.currentProvider);

  const channel = await Channel.deployed();
  return channel.address;
  
}

export async function submitTx(web3: Web3, account: string, message: string, balance1: number, balance2: number, signature1: string, signature2: string): Promise<any> {
   Channel.setProvider(web3.currentProvider);

   const channel = await Channel.deployed();

   const bytesSignatures = [];

   const nonce = await getNonce(web3);

     console.log({nonce});


  //  for (let i = 0; i < signatures.length; i++) {
  //    bytesSignatures[i] = bytes;
     
  //   }
    const bytes1 = web3.utils.asciiToHex(signature1);
    const bytes2 = web3.utils.asciiToHex(signature2);

    const bal1 = web3.utils.toWei(balance1.toString(), 'ether');
    const bal2 = web3.utils.toWei(balance2.toString(), 'ether');

    console.log(nonce, message, balance1, balance2, bytes1, bytes2);
        // function submitTx(uint _nonce, bytes32 _message, uint _balance1, uint _balance2, bytes memory _signature1, bytes memory _signature2) 


    const isVerified = await channel.submitTx(nonce, message, bal1, bal2, signature1, signature2, {
      from: account,
    });
   

   return isVerified;

}