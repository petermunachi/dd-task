// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Token is ERC20, Ownable {

  mapping(address => bool) public admins;

  event Admins(address admin, uint time, bool active );

  modifier onlyAdmins() {
    require(admins[msg.sender], "only admins can mint tokens");
    _;
  }
  
  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    admins[msg.sender] = true;
  }

  function addAdmin(address newAdmin) external onlyOwner {
    require(!admins[newAdmin], "Admin already exist");
    admins[newAdmin] = true;
    emit Admins(newAdmin, block.timestamp, true);
  } 
  
  function removeAdmin(address admin) external onlyOwner {
    require(admin != _msgSender(), 'cannot remove owner as admin');
    require(admins[admin], "Admin does not exist");
    admins[admin] = false;
    emit Admins(admin, block.timestamp, false);
  }

  function mint(address to, uint amount) external onlyAdmins{
    _mint(to, amount);
  }

  function burn(address owner, uint amount) external onlyAdmins{
    _burn(owner, amount);
  }


}
