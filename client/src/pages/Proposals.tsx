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


function Proposals () {

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
    const baseUrl = `/api/signedProposals/`;

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

      try{
        const response = (await request.post(baseUrl, postData)).data;
        console.log({response});
        if(response !== null){
          swal("", "Proposal submitted successfully", "success");

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
          <h2 className="title">Signed Proposals</h2>
        </div>
        {postData === null ? (
          <NotFound />
        ) : (
            postData.map((data: any)=>(
                <ProposalCard
                  owner1={data.owner1}
                  owner2={data.owner2}
                  author={data.author_address}
                  owner1Balance={data.owner1_balance}
                  owner2Balance={data.owner2_balance}
                  nonce={data.nonce}
                  
                />

            ))



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

export default Proposals;
