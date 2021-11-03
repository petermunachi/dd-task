import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { useChannelContext } from "../contexts/Channel";

import Balances from "../components/Balances";

function About() {


  const {
    state: { channelAddress, tokenAddress, nonce },
  } = useChannelContext();  


  return (
    <AboutWrapper>

      <div className="box p-4">
        <h3 className="">About</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat perferendis 
          asperiores recusandae eligendi quia, laudantium voluptas. Aspernatur est molestiae,
          cumque sunt quae vel, inventore quis suscipit eaque sequi odit dignissimos.
        </p>

        <h3 className="mt-3">Network</h3>
        <p>Goerli Testnet</p>

        <div className="d-flex align-items-center mt-3">
          <div className="mr-4">
            <h3>Token Address</h3>
            <p className="small">{tokenAddress}</p>
          </div>
          <div className="">
            <h3>Contract Address</h3>
            <p className="small">{channelAddress}</p>
          </div>
        </div>

        <h3 className="mt-3">Current Nonce</h3>
        <p>{nonce}</p>


      </div>

      <Balances />

    </AboutWrapper>
  );


}

const AboutWrapper = styled.div`

  .title {
    color: #a87dc8;
    font-weight: 700;
    font-size: 1.7rem;
    margin-bottom: 1rem
  }

  .mr-4 {
    margin-right: 3rem;
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

  .small {
    font-size: 1rem !important;
  }

  .box h3 {
    color: #a87dc8;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .table-th {
    color: #a87dc8;
    font-weight: 700;
    font-size: 1.5rem;
  }

  td {
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1rem 0;
  }

  p{
    color: white;
    font-size: 1.2rem;
  }


`;


export default About;
