import React from "react";
import styled from "styled-components";
import { useChannelContext } from "../contexts/Channel";


function Balances () {

  const {
    state: { balances, owners },
  } = useChannelContext();


  return (
    <Wrapper>

        <div className="box">   
            <table className="table">
                <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="table-th">Owners</th>
                  <th scope="col" className="table-th">Current Token Balance</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="small">Owner 1</td>
                    <td className="small">{owners[0]}</td>
                    <td className="small">{balances[0]}</td>
                </tr>
                <tr>
                    <td className="small">Owner 2</td>
                    <td className="small">{owners[1]}</td>
                    <td className="small">{balances[1]}</td>
                </tr>
                
                </tbody>
            </table>
        
        </div>

    </Wrapper>
  );
} 


const Wrapper = styled.div`
  
  .box {
    border: 1px solid #fff;
    padding: 1rem;
  }

  .table-th {
    color: #a87dc8;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .small {
    font-size: 1rem !important;
  }

  td {
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1rem;
  }


`;

export default Balances;
