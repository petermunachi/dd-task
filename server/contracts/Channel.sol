// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './interfaces/IToken.sol';



contract Channel  {

    IToken public token;

    uint public processedNonces;

    mapping(address => bool) public isOwner;

    address[] public owners;

    event UpdateBalance(uint firstOwnerBalance, uint secondOwnerBalance, uint timestamp);

    event VerifiedSignatures(uint nonce, bytes32 messageHash, uint firstOwnerBalance, uint secondOwnerBalance, bytes firstOwnerSignature, bytes secondOwnerSignature, address sender, uint timestamp);


    constructor(address _token, address[] memory _owners) {

        require(_owners.length > 0, "owners required");
       
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);

        }

        token = IToken(_token);

    }

    function submitTx(uint _nonce, bytes32 _messageHash, uint _balance1, uint _balance2, bytes memory _signature1, bytes memory _signature2) 
        public 
    {
        require(isOwner[msg.sender], "Sender is not an owner");

        require(_nonce == processedNonces, 'Invalid transaction nonce');

        require(isValidSignature(owners[0], _messageHash, _signature1) , 'wrong signature from signer 1');
        require(isValidSignature(owners[1], _messageHash, _signature2) , 'wrong signature from signer 2');


        processedNonces++;

        updateBalances(_balance1, _balance2);

        emit VerifiedSignatures(_nonce, _messageHash, _balance1, _balance2, _signature1, _signature2, msg.sender, block.timestamp);


    }


    function getEthSignedMessageHash(bytes32 _messageHash)
        public
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

    function isValidSignature(
        address _signer,
        bytes32 _messageHash,
        bytes memory _signature
    ) public pure returns (bool) {
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(_messageHash);

        return recoverSigner(ethSignedMessageHash, _signature) == _signer;
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
        public
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");

        assembly {

            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

    }


    function updateBalances(uint _balance1, uint _balance2) 
        internal
    {

        uint firstOwnerBalance = token.balanceOf(owners[0]);
        uint secondOwnerBalance = token.balanceOf(owners[1]);

        if (firstOwnerBalance != _balance1) {
            token.burn(owners[0], firstOwnerBalance);
            token.mint(owners[0], _balance1);
        } 

        if (secondOwnerBalance != _balance2) {
            token.burn(owners[1], secondOwnerBalance);
            token.mint(owners[1], _balance2);
        } 

        emit UpdateBalance(_balance1, _balance2, block.timestamp);
        
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }



}