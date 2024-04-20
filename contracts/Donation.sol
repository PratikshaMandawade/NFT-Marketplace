// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Donation {
    address public owner;
    uint256 public totalDonations;

    mapping (address=> bool) public donors;
    address[] public donorList;

    struct Donor{
        address from;
        uint256 value;
        uint256 timestamp;
    }

    Donor[] public donorsList;
    mapping (address=> Donor[]) public donorsLists;

    event DonationReceived(address donor, uint amount);

    modifier onlyOwner(){
        require(msg.sender == owner, "Only the owner of the contract can call");
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    function donate() public payable{
        require(msg.value > 0, "Donation amount must be greater then ZERO");

        donorsList.push(Donor(msg.sender, msg.value, block.timestamp));

        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }

    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    function widthdraw() public onlyOwner{
        uint256 balance = address(this).balance;
        require(balance > 0, "Contract balance is ZERO");
        payable(owner).transfer(balance);
    }

    function getAllDonors() public view returns(Donor[] memory){
        return donorsList;
    }

}