// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IToken { 
  function balanceOf(address account) external view returns (uint256);
  function mint(address to, uint amount) external;
  function burn(address owner, uint amount) external;
} 
