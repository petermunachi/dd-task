import React, {useEffect, useState} from "react";
import swal from 'sweetalert';

import styled from "styled-components";
import request from "../api/request";
import { useWeb3Context } from "../contexts/Web3";
import { useChannelContext } from "../contexts/Channel";
import Balances from "../components/Balances";
import { signMessage } from "../utils/helper";

import NotFound from "../components/NotFound";
import ProposalCard from "../components/ProposalCard";
import { submitTx } from "../api/channel";
import { PostData } from "../utils/types";


function NewProposal () {

  const [postData, setPostData] = useState<any>(null)


  const {
    state: { web3, account },
  } = useWeb3Context();  

  const {
    state: { owners, nonce },
  } = useChannelContext();


  useEffect(() => {

    fetchData()
   
  }, [])

  const fetchData = async () => {
    const baseUrl = `/api/newProposal/getProposal/1`;

      try{
        const response = (await request.get(baseUrl)).data;
        console.log({response});
        if(response !== null){
          setPostData(response)
        }
      }catch(err){
        console.log(err);
      }
  }

  const checkIsSigned = (owner1_signed: number, owner2_signed: number) => { 

    if (owner1_signed === 1 && owners[0] === account) {
      return true;
    }
    if (owner2_signed === 1 && owners[1] === account) {
      return true;
    }

    return false;
    
  }

  const signProposal = async () => {

    if (!web3) {
      swal("", "Wallet not connected", "error");
      return;
    }

    if (!postData) {
      swal("", "No data found to sign proposal", "error");
      return;
    }

    const exampleMessage = `${postData.owner1_balance}${postData.owner1_balance}${Number(nonce)}`;

    const msg = await signMessage(web3, account, exampleMessage);

    // console.log({sig});

    if (msg && msg.sig && msg.hash) {
      const baseUrl = `/api/newProposal/updateProposal/1`;

      let data: PostData = {
        messageHash: msg.hash,
        confirmation_count: postData.confirmation_count + 1,
      };

      if (owners[0] === account) {
        data.owner1_signature =  msg.sig;
        data.owner1_signed = 1;    
      }else if (owners[1] === account) {
        data.owner2_signature =  msg.sig;
        data.owner2_signed = 1;
      }
      const response = (await request.put(baseUrl, data)).data;
      console.log({response});

      if(response.status === 'success'){
        fetchData();
        swal("", "Proposal have been signed", "success");
      }

    }
    

  }

  const submitProposal = async () => {
    if (!web3) {
      swal("", "Wallet not connected", "error");
      return;
    }

    if (postData.confirmation_count !== 2) {
      swal("", "Proposal confirmation not complete", "error");
      return;
    }

    if (!postData.owner1_balance  || !postData.owner2_balance || !postData.owner1_signature || !postData.owner2_signature) {
      swal("", "No data found to sign proposal", "error");
      return;
    }


    console.log(web3, account, [postData.owner1_balance, postData.owner2_balance], [postData.owner1_signature, postData.owner2_signature]);
    
    const tx = await submitTx(web3, account, postData.messageHash, postData.owner1_balance, postData.owner2_balance, postData.owner1_signature, postData.owner2_signature);

    console.log(tx.receipt.transactionHash);
    console.log({tx});

    if (tx.receipt.transactionHash) {
      const baseUrl = `/api/signedProposals/`;
      postData.id = null;

      try{
        const response = (await request.post(baseUrl, postData)).data;
        console.log({response});
        if(response !== null){
          swal("", "Proposal submitted successfully", "success");
          window.location.reload();

        }
      }catch(err){
        console.log(err);
      }

    }
    
  }

  const deleteProposal = async () => {

    const baseUrl = `/api/newProposal/deleteProposal/1`;

    const result = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this proposal!",
      icon: "warning",
      buttons: ["Cancel", "Yes, continue"],

    })

    if (result) {
      try{
        const response = (await request.delete(baseUrl)).data;
        console.log({response});
        if(response.status =="success"){
          swal("Proposal have been deleted!", {
            icon: "success",
          });
        }
      }catch(err){
        console.log(err);
      }
    }

      
  }


  return (
    <Wrapper>
        <Balances />
        <div className="mt-5">
          <h2 className="title">New Proposals</h2>
        </div>
        {postData === null ? (
          <NotFound />
        ) : (

          <ProposalCard
            owner1={postData.owner1}
            owner2={postData.owner2}
            author={postData.author_address}
            owner1Balance={postData.owner1_balance}
            owner2Balance={postData.owner2_balance}
            numberOfConfirmation={postData.confirmation_count}
            nonce={postData.nonce}
            signed={checkIsSigned(postData.owner1_signed, postData.owner2_signed)}
            signProposal={signProposal}
            submitProposal={submitProposal}
            deleteProposal={deleteProposal}
            
          />

        )}




    </Wrapper>
  );
} 


const Wrapper = styled.div`
  .title {
    color: #a87dc8;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }

`;

export default NewProposal;
