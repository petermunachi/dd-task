import React, {useState} from "react";
import styled from "styled-components";
import { unlockAccount } from "../api/web3";
import useAsync from "../components/useAsync";
import { useWeb3Context } from "../contexts/Web3";

import Logo from "../assets/logo.png";
import BgImg from "../assets/top-img.png";

import { shortenAddress } from "../utils/helper";
import Page from "../components/GetPage";


function App() {
  const [pageId, setPageId] = useState(1);
  const {
    state: { account, netId },
    updateAccount,
  } = useWeb3Context();

  const { pending, error, call } = useAsync(unlockAccount);

  async function onClickConnect() {
    const { error, data } = await call(null);

    if (error) {
      console.error(error);
    }
    if (data) {
      updateAccount(data);
    }

  }

  const activePage = (id: number) => {
    return id === pageId ? "box-left selected" : "box-left";
  };

  return (
    <Wrapper >

      <header className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="title-header d-flex align-items-center">
            <div className="img-container">
              <img alt="logo" src={Logo} width="100%" height="100%" />
            </div>
            <h1 className="header-text">simple channel system</h1>
          </div>
          <div className="button-header">
            <button 
              type="button" 
              className="btn btn-lg btn-outline-light"
              onClick={() => onClickConnect()}
              disabled={pending}
            >
              {account ? (shortenAddress(account)) : "Connect wallet"}
            </button>
          </div>
        </div>
      </header>

      <hr className="hr-header" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="box-wrapper">

              <div className="upper-part bg-blue">

                <div className="box-img-container">
                  <img alt="logo" src={BgImg} width="100%" height="100%" />
                </div>
                
              </div>

              <div className="lower-part pt-3">

                <div className={activePage(1)}>
                  <span className="" onClick={()=>setPageId(1)}>New Proposals</span>
                </div>

                <div className={activePage(2)}>
                  <span className="" onClick={()=>setPageId(2)}>Add New Proposals</span>
                </div>

                <div className={activePage(3)}>
                  <span className="" onClick={()=>setPageId(3)}>Signed Proposals</span>
                </div>

                <div className={activePage(4)}>
                  <span className="" onClick={()=>setPageId(4)}>About</span>
                </div>

                <div className={activePage(4)}>
                  <span className="">Theoritical Test</span>
                </div>

              </div>
              
             

            </div>
          </div>
          <div className="col-md-8">
      
            <Page id={pageId} />

             
          
          </div>
        </div>
      </div>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #323032;
  min-height: 100vh;

  header{
    padding: 1rem 0;
  }

  header .img-container{
    width: 4rem;
    margin-right: 1rem
  }

  .bg-blue {
    background-color: #a87dc8;
  }

  .header-text {
    color: #fff;
    font-weight: 700;
    font-size: 1.6rem;
    text-transform: capitalize
  }

  .hr-header{
    color: white;
    border 1.5px solid white;
    margin: 0;
  }

  .box-wrapper {
    border: 1.5px double #fff;
  }

  .upper-part {
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  .box-img-container img {
    object-fit: cover;
    object-position: center;
  }

  .box-left {
    padding: 1rem .8rem;
    border-bottom: 1px solid white

  }

  .box-left span{
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
  }

  .box-left span:hover{
    color: #a87dc8;
    font-weight: 700;
  }

  .selected span {
    color: #a87dc8;
    font-weight: 700;
  }



`;


export default App;
