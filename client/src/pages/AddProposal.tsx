import React from "react";
import styled from "styled-components";
import swal from 'sweetalert';

import Balances from "../components/Balances";
import { useForm } from "../utils/useForm";
import { useWeb3Context } from "../contexts/Web3";
import { useChannelContext } from "../contexts/Channel";
import { shortenAddress, signMessage } from "../utils/helper";
import { checkOwner } from "../api/channel";
import request from "../api/request";
import { PostData } from "../utils/types";


function AddProposal () {

  const [values, handleChange] = useForm({owner1_balance: "0", owner2_balance: "0"})

  const {
    state: { web3, account },
  } = useWeb3Context();  

  const {
    state: { owners, nonce },
  } = useChannelContext();

  const handleSubmit = async () => {

    if (!web3) {
      swal("", "Wallet not connected", "error");
      return;
    }

    const isOwner = await checkOwner(web3, account);

    if (!isOwner) {
      swal("", "Account is not an owner", "error");
      return;
    }

    const baseUrl = '/api/newProposal/';

    try{
      values.author_address = account;
      values.nonce = nonce;
      values.owner1 = owners[0];
      values.owner2 = owners[1];

      console.log({values});
      
      const response = (await request.post(baseUrl, values)).data;
      console.log({response});
      if(response.status === 'success'){
        const result = await swal({
          title: "Proposal submitted successfully",
          text: "Do you want to sign this proposal?",
          icon: "success",
          buttons: ["Maybe later", "Yes, continue"],
        })
        if (result) {
          await sign();
        }
        
      }else{
        swal("Something went wrong !!!", "Unable to submit proposal. Please try again", "error");
      }
    }catch(err){
      console.log(err);
    }

  }



  const sign = async () => {

    if (!web3) {
      swal("", "Wallet not connected", "error");
      return;
    }

    const exampleMessage = `${values.owner1_balance}${values.owner1_balance}${Number(nonce)}`;


    const msg = await signMessage(web3, account, exampleMessage);

    console.log({msg});

    if (msg && msg.sig && msg.hash) {
      const baseUrl = `/api/newProposal/updateProposal/1`;

      let data: PostData = {
        messageHash: msg.hash,
        confirmation_count: 1,
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
        swal("", "Proposal have been signed", "success");
      }

    }
    

  }



  return (
    <AddProposalWrapper>

      <Balances />

      <div className="box mt-5 pb-5">
        <div className="bg-blue p-3 d-flex justify-content-center">
          <h3 className="title">Add a proposal</h3>
        </div>

        <form className="p-3 mt-3">
          <div className="row">
            <div className="col">
              <label htmlFor="formGroupExampleInput">Owner 1 &nbsp; <small>({shortenAddress(owners[0])})</small></label>
              <input 
                type="number" 
                name="owner1_balance"
                value={values.owner1_balance}
                onChange={handleChange}
                className="form-control" 
                placeholder="Owner 1" 
              /> 
            </div>
            <div className="col">
                <label htmlFor="formGroupExampleInput">Owner 2 &nbsp; <small>({shortenAddress(owners[1])})</small></label>
                <input 
                  type="number" 
                  name="owner2_balance"
                  value={values.owner2_balance}
                  onChange={handleChange}
                  className="form-control" 
                  placeholder="Owner 2" 
                />
            </div>
            </div>

            <div className="text-center mt-5">
              <button type="button" onClick={handleSubmit} className="btn btn-lg px-5 btn-light">Submit</button>
            </div>
            
        </form>

      </div>

    </AddProposalWrapper>
  );
} 


const AddProposalWrapper = styled.div`
  .title {
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .bg-blue {
    background-color: #a87dc8;
  }

  .box {
    border: 1px solid #fff;
  }

  .box-upper-part {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    
  }

  p{
    color: white;
    font-size: 1.2rem;
  }

  label {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
    padding-bottom: 10px;
  }

  input {
    background-color: transparent;
    padding: .5rem 10px;
    font-size: 1.2rem;
    color: #a87dc8;
  }


`;

export default AddProposal;
