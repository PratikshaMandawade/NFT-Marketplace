// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";


contract NFTMarketplace is ERC721URIStorage, ReentrancyGuard{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    
    //BIDDING COUNT
    Counters.Counter public _numberOfBid;

    uint256 listingPrice = 0.015 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        uint256 netPrice;
        bool sold;
        bool auction;
        uint256 startAt;
        uint256 endAt;
        uint256 tokenPrice;
        uint256 bidId;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

   //USERS BIDDING
    mapping(uint256 => userBidding) public userBiddingNFT;
    struct userBidding {
         uint256 tokenId;
         uint256 bidId;
         address bidAddress;
         uint256 bidAmount;
         uint256 bitEnding;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    uint256 public AuctionCounter;

    event AuctionCreated( address indexed seller, uint256 price, uint256 tokenId, uint256 startAt, uint256 endAt);
    event BidCreated(uint256 listingId, address indexed bidder, uint256 bid);
    event AuctionCompleted(uint256 listingId, address indexed seller, address indexed bidder, uint256 bid);
    event WithdrawBid(uint256 listingId, address indexed bidder, uint256 bid);


    mapping(uint256 => mapping(address => uint256)) public bids;

    address[] public bidders;

    mapping(uint256 => address) public highestBidder;


    constructor()ERC721("CryptoKing", "CK"){
        owner = payable(msg.sender);
    }

    // UPDATE LISTING PRICE
    function updateListingPrice(uint _listingPrice) public payable {
        require(owner == msg.sender, "Only owner can call this function");
        listingPrice = _listingPrice;
    }

    //GET LISTING PRICE
    function getListingPrice() public view returns(uint256){
        return listingPrice;
    }

    //MINTS NFT TO THE MARKETPLACE
    function createToken(string memory tokenURI, uint256 price, uint256 tokenPrice)     public payable returns(uint256){
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price, tokenPrice);
        return newTokenId;
    }

    //CREATEMARKETITEM INTERNAL FUNCTION
    function createMarketItem(uint256 tokenId, uint256 price, uint256 tokenPrice) private {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

          idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            price,
            false,
            false,
            0,
            0,
            tokenPrice,
            0
        );

        _transfer(msg.sender, address(this), tokenId);
       
        emit MarketItemCreated(
            tokenId, msg.sender, address(this), price, false
        );
    }

    //RESELL NFT 
    function resellToken(uint256 tokenId, uint256 price) public payable{
         require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can resell this nft");
        require(msg.value == listingPrice, "Price must be equal to listing price");

       idToMarketItem[tokenId].sold = false;
       idToMarketItem[tokenId].price = price;
       idToMarketItem[tokenId].seller = payable(msg.sender);
       idToMarketItem[tokenId].owner = payable(address(this));
       _itemsSold.decrement();

       _transfer(msg.sender, address(this), tokenId);
    }
    

    //CREATE SALE FOR MARKETPLACE
    function createMarketSale(uint256 tokenId) public payable{
        uint price = idToMarketItem[tokenId].price;
        require(msg.value == price, "Please submit the asking price to purchase the NFT");
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].auction = false;
        idToMarketItem[tokenId].netPrice = 0;
        idToMarketItem[tokenId].startAt = 0;
        idToMarketItem[tokenId].endAt = 0;

        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
        idToMarketItem[tokenId].seller = payable(address(0));
    }

    //GET ALL UNSOLD NFT
    function fetchMarketItems() public view returns(MarketItem[] memory){
       uint itemCount = _tokenIds.current();
       uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
       uint currentIndex = 0;

       MarketItem[] memory items = new MarketItem[](unsoldItemCount);

       for(uint i = 0; i < itemCount; i++){
        if(idToMarketItem[i + 1].owner == address(this)){
            uint currentId = i + 1;
            MarketItem storage currentItem = idToMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
       }
       return items;
    }

    //GET ALL NFT THAT USER PURCHASED
     function fetchMyNFTs() public view returns(MarketItem[] memory){
       uint totalItemCount = _tokenIds.current();
       uint itemCount = 0;
       uint currentIndex = 0;

       for(uint i = 0; i < totalItemCount; i++){
        if(idToMarketItem[i + 1].owner == msg.sender){
            itemCount += 1;
        }
       }

       MarketItem[] memory items = new MarketItem[](itemCount);

       for(uint i = 0; i < totalItemCount; i++){
        if(idToMarketItem[i + 1].owner == msg.sender){
            uint currentId = i + 1;
            MarketItem storage currentItem = idToMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
       }
       return items;
    }

    //GET USER LISTED NFTs
     function fetchItemsListed() public view returns(MarketItem[] memory){
       uint totalItemCount = _tokenIds.current();
       uint itemCount = 0;
       uint currentIndex = 0;

       for(uint i = 0; i < totalItemCount; i++){
        if(idToMarketItem[i + 1].seller == msg.sender){
            itemCount += 1;
        }
       }

       MarketItem[] memory items = new MarketItem[](itemCount);

       for(uint i = 0; i < totalItemCount; i++){
        if(idToMarketItem[i + 1].seller == msg.sender){
            uint currentId = i + 1;
            MarketItem storage currentItem = idToMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
       }
       return items;
    }

    //GET CONTRACT BALANCE
    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    //WIDTHDRAW FUND FROM CONTRACT
    function widthdraw() public onlyOwner{
        uint256 balance = address(this).balance;
        require(balance > 0, "Contract balance is ZERO");
        payable(owner).transfer(balance);
    }

    //BUY NFTS WITH ERC20 NATIVE TOKEN
    function buyNFTWithToken(uint256 tokenId) public payable returns(address){

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].auction = false;
        idToMarketItem[tokenId].netPrice = 0;
        idToMarketItem[tokenId].startAt = 0;
        idToMarketItem[tokenId].endAt = 0;

        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
       
        idToMarketItem[tokenId].seller = payable(address(0));

        return idToMarketItem[tokenId].owner;
    }

    //AUCTION NFTS
    function createAuctionListing(uint256 auctionPrice, uint256 tokenId, uint256 durationInSeconds) public returns(uint256){

        require(idToMarketItem[tokenId].seller == msg.sender, "You are not the Owner");

        AuctionCounter++;

        uint256 startAt = block.timestamp;
        uint256 endAt = startAt + durationInSeconds;

        idToMarketItem[tokenId].netPrice = auctionPrice;
        idToMarketItem[tokenId].auction = true;
        idToMarketItem[tokenId].startAt = startAt;
        idToMarketItem[tokenId].endAt = endAt;

        emit AuctionCreated(msg.sender, auctionPrice, tokenId, startAt, endAt);

        return tokenId;

    }

    //BIDDING FUNCTION
    function bid(uint256 tokenId) public payable nonReentrant returns(uint256){
        require(isAuctionOpen(tokenId), "Auction has ended");
        MarketItem storage items = idToMarketItem[tokenId];
        require(msg.sender != items.seller, "cannot bid on what you own");

        uint256 priviousBid = bids[tokenId][msg.sender];
        require(priviousBid == 0, "You already given your bid");

        uint256 newBid = bids[tokenId][msg.sender] + msg.value;
        require(newBid >= items.netPrice, "Cannot bid below the latest bidding price");

        bids[tokenId][msg.sender] += msg.value;

        uint256 currentPrice = 1 ether + msg.value;
        items.netPrice = currentPrice;

        highestBidder[tokenId] = msg.sender;
        bidders.push(msg.sender);  

          //SINGLE NFT BID DATA
        _numberOfBid.increment();

        uint256 newNFTBidId = _numberOfBid.current();

        //NFT DATA
        items.bidId = newNFTBidId;

        //DATE STORING IN USER BID STRUCK
         userBiddingNFT[newNFTBidId] = userBidding(
            tokenId,
            newNFTBidId,
            payable(msg.sender),
            msg.value,
            items.endAt
        );


        emit BidCreated(tokenId, msg.sender, newBid);

        return priviousBid;
    }

    //COMPLETE AUCTION
    function completeAuction(uint256 tokenId) public payable nonReentrant{
        require(!isAuctionOpen(tokenId), "Auction is still open");

        MarketItem storage items = idToMarketItem[tokenId];
        address winner = highestBidder[tokenId];
        require(msg.sender == items.seller || msg.sender == winner, "Only seller or winner can complete auction");

        if(winner != address(0)){
            items.owner = payable(winner);
            items.sold = true ;
            items.auction = false ;
            items.netPrice = 0;
            items.startAt = 0;
            items.endAt = 0;

            _itemsSold.increment();
            _transfer(address(this), winner, items.tokenId);

            uint256 amount = bids[tokenId][winner];
            bids[tokenId][winner] = 0;

            //WINNER BID INFO FROM BIDS MAPPING
            delete bids[tokenId][winner];

            //DELETING HIGGESTER BIDDER
            delete highestBidder[tokenId];

            //DELETING USERBID
            delete userBiddingNFT[items.bidId];

            items.bidId = 0;
            _numberOfBid.decrement();

            _transferFund(payable(items.seller), amount);
            items.seller = payable(address(0));
        } else{
                items.sold = false ;
                items.auction = false ;
                items.netPrice = 0;
                items.startAt = 0;
                items.endAt = 0;
        }

        emit AuctionCompleted(tokenId, items.seller, winner, bids[tokenId][winner]);
    }

    //WIDTHDRAW BIDS
    function widthdrawBid(uint256 tokenId , uint256 bidId) public payable nonReentrant {
        require(!isAuctionOpen(tokenId) , "Auction must be end");
        require(highestBidder[tokenId] != msg.sender, "Higest bidder cannot widthdraw bid");

        uint256 balance = bids[tokenId][msg.sender];
        require(balance != 0, "Sorry you have not bid in the NFT");


        delete bids[tokenId][msg.sender];

         //DELETING USERBID
        delete userBiddingNFT[bidId];

         _numberOfBid.decrement();
        
       
        bids[tokenId][msg.sender] = 0;
        _transferFund(payable(msg.sender), balance);

        emit WithdrawBid(tokenId, msg.sender, balance);
       
      
    }
     
    //CHECK AUCTION STATUS
    function isAuctionOpen(uint256 tokenId) public view returns(bool){
        return idToMarketItem[tokenId].endAt > block.timestamp;
    }

    function isAuctionExpired(uint256 tokenId) public view returns (bool){
        return idToMarketItem[tokenId].endAt <= block.timestamp;
    }

    //TRANSFER FUNCTION
    function _transferFund(address payable to, uint256 amount) internal{
        if(amount == 0){
            return;
        }
        require(to != address(0), "Error cannot transfer to address(0)");

        (bool transferSent,) = to.call{value: amount}("");
        require(transferSent, "Error, failed to send Ether");
    }

    //GET HIGhEST BIDDER
    function getHighestBidder(uint256 _tokenId) public view returns(address){
        return highestBidder[_tokenId];
    }

    //FETCH AUCTION NFTS
    function fetchMarketAuctionItems() public view returns(MarketItem[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].auction == true){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].auction == true){
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //FETCH ITEMS AUCTION LISTED
    function fetchItemsAuctionListed() public view returns(MarketItem[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++){
            if( idToMarketItem[i + 1].seller == msg.sender && idToMarketItem[i + 1].auction == true){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].seller == msg.sender && idToMarketItem[i + 1].auction == true){
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    ////GET BIDDERS
    function getBidders() external view returns(address[] memory){
        return bidders;
    }

    //INTERNAL MULTI FUNCTION
    function multiply(uint256 x, uint256 y) internal pure returns(uint256 z){
        require(y == 0 || (z = x * y) / y == x);
    }

   //NEW FUNCTION
    function getAddresses() external view returns(address) {
        return msg.sender;
    }

    
     //GET ALL USER BIDS
    function fetchUserBids() public view returns(userBidding[] memory){
       uint totalItemCount = _numberOfBid.current();
       uint itemCount = 0;
       uint currentIndex = 0;

       for(uint i = 0; i < totalItemCount; i++){
        if(userBiddingNFT[i + 1].bidAddress == msg.sender){
            itemCount += 1;
        }
       }

       userBidding[] memory items = new userBidding[](itemCount);

       for(uint i = 0; i < totalItemCount; i++){
        if(userBiddingNFT[i + 1].bidAddress == msg.sender){
            uint currentId = i + 1;
            userBidding storage currentItem = userBiddingNFT[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
       }
       return items;
    }

    //GET NFT BIDS
    function fetchNFTBids(uint256 tokenId) public view returns(userBidding[] memory){
       uint totalItemCount = _numberOfBid.current();
       uint itemCount = 0;
       uint currentIndex = 0;

       for(uint i = 0; i < totalItemCount; i++){
        if(userBiddingNFT[i + 1].tokenId == tokenId){
            itemCount += 1;
        }
       }

       userBidding[] memory items = new userBidding[](itemCount);

       for(uint i = 0; i < totalItemCount; i++){
        if(userBiddingNFT[i + 1].tokenId == tokenId){
            uint currentId = i + 1;
            userBidding storage currentItem = userBiddingNFT[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
       }
       return items;
    }

}