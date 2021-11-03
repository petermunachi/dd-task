import React from "react";
import styled from "styled-components";







function NotFound () {

  return (
    <Wrapper>

        <div className="box mt-4">
            <h1 className="text-center empty">Oops we can't find any proposal</h1>
        </div>

    </Wrapper>
  );
} 


const Wrapper = styled.div`
  
  .box {
    border: 1px solid #fff;
  }

 .empty {
    color: #fff;
    font-size: 1.2rem;
    padding: 3rem 0;
  }


`;

export default NotFound;
