// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TransferFunds{

    struct userTransfer{
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
        string name;
        string description;
    }

    userTransfer[] public transferHistory;
    mapping (address=> userTransfer[]) public userTransferHistory;

    function transfer(address payable recipient, string memory _name, string memory _description, uint256 _amount) public payable {

        transferHistory.push(userTransfer(msg.sender, recipient, _amount, block.timestamp, _name, _description));

        userTransferHistory[msg.sender].push(userTransfer(msg.sender, recipient, _amount, block.timestamp, _name, _description ));
    }

    function getUserTransferHistory() public view returns(userTransfer[] memory){
        return userTransferHistory[msg.sender];
    }

    function getTransferHistory() public view returns(userTransfer[] memory){
        return transferHistory;
    }
}