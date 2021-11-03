import React, { ReactElement, useState, useEffect } from "react";
import styled from "styled-components";
import { NewProposalResponse } from "../utils/types";
import { useWeb3Context } from "../contexts/Web3";



const ProposalCard = ({author, owner1, owner2, owner1Balance, owner2Balance, numberOfConfirmation, nonce, signed, signProposal, submitProposal, deleteProposal}: NewProposalResponse): ReactElement => {

  const {
    state: { account },
  } = useWeb3Context();  


  return (
    <Wrapper>

        
        <div className="box mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="author"><span className="text-blue">Author: </span> <small>{author}</small></h2>
              {numberOfConfirmation && (
                <button type="button" className="btn-sm btn btn-success">{numberOfConfirmation < 2 ? 'Ongoing' : 'Signed' }</button>
              )}
            </div>

            <hr />

            <h2 className="proposed text-blue">Proposed Balances</h2>
            <table className="table">

                <tbody>
                <tr>
                    <td>Owner 1</td>
                    <td>{owner1}</td>
                    <td>{owner1Balance}</td>
                </tr>
                <tr>
                    <td>Owner 2</td>
                    <td>{owner2}</td>
                    <td>{owner2Balance}</td>
                </tr>
                
                </tbody>
            </table>

            <div className="d-flex align-items-center">
              {numberOfConfirmation && (
                <div className="mr-5">
                  <h2 className="author"><span className="text-blue">Number of confirmation: </span> <small>{numberOfConfirmation} / 2</small></h2>
                  
                </div>
              )}
              <div className="">
                <h2 className="author"><span className="text-blue">Transaction Nonce: </span> <small>{nonce}</small></h2>

              </div>

            </div>

            <div className="d-flex align-items-center mt-4">
              <div className="mr-5">
                <button type="button" onClick={deleteProposal} className="btn btn-lg px-5 btn-danger">Delete</button>
              </div>

              {
                account ? (
                  signed ? (
                    <div className="">
                      <button type="button" onClick={submitProposal} className="btn btn-lg px-5 btn-outline-light">Submit</button>
                    </div>
                  ) : (
                    <div className="">
                      <button type="button" onClick={signProposal} className="btn btn-lg px-5 btn-outline-light">Sign Proposal</button>
                    </div>
                  )
                ) : (<p className="text-white">Connected your wallet to sign or submit proposal</p>)
              }
                         
              
            </div>


        </div>

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

  .table-th {
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
  }

  td {
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    padding: .7rem;
  }

  .box {
    border: 1px solid #fff;
    padding: 1rem;
  }

  .text-blue {
    color: #a87dc8
  }

  .author {
    font-size: 1.3rem;
    color: white;
  }

  .mr-5 {
    margin-right: 3rem;
  }

  hr {
    border 1px solid white !important;
    opacity: 1;
    background-color: #fff !important;
    height: .1px;
  }

  .proposed {
    font-size: 1.5rem;
  }

`;


export default ProposalCard;
