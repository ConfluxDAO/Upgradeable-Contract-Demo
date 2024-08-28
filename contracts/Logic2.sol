// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Logic2 {
    address public implementation;
    address public admin;
    string public words;

    function foo() public {
        words = "new";
    }
}