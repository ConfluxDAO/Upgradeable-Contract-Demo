// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract SimpleUpgrade {
    address public implementation;
    address public admin;
    string public words;

    constructor(address _implementation) {
        admin = msg.sender;
        implementation = _implementation;
    }

    fallback() external payable {
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }

    receive() external payable {
    }

    function upgrade(address newImplementation) external {
        require(msg.sender == admin, "Only admin can upgrade");
        implementation = newImplementation;
    }
}