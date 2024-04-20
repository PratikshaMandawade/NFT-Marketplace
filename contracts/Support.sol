// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Support{

    struct userMessage {
        address from;
        uint256 timestamp;
        string name;
        string message;
        string title;
    }

    userMessage[] public userHistory;
    mapping (address=> userMessage[]) public userMessageHistory;

    function sendMessage(string memory _name, string memory _message, string memory _title) public payable {

        userHistory.push(userMessage(msg.sender, block.timestamp, _name, _message, _title));

        userMessageHistory[msg.sender].push(userMessage(msg.sender, block.timestamp, _name, _message, _title));
    }

    function getUserMessageHistory() public view returns(userMessage[] memory){
        return userMessageHistory[msg.sender];
    }

    function getMessageHistory() public view returns(userMessage[] memory){
        return userHistory;
    }
}