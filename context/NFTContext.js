import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from "next/router";

///INTERNAL IMPORT
import { convertTime } from "../utils/time";
import {
  NFTMARKETPLACE_ABI,
  NFTMARKETPLACE_ADDRESS,
  THE_BLOCKCHAIN_CODER_ABI,
  THE_BLOCKCHAIN_CODER_ADDRESS,
  TOKEN_SALE_ABI,
  TOKEN_SALE_ADDRESS,
  COMMUNITY_ABI,
  COMMUNITY_ADDRESS,
  TRANSFER_FUND_ABI,
  TRANSFER_FUND_ADDRESS,
  SUPPORT_ABI,
  SUPPORT_ADDRESS,
  DONATION_ABI,
  DONATION_ADDRESS,
} from "./constants";
import {
  getBalance,
  checkIfWalletConnected_NEW,
  CALLING_CONTRACT,
} from "../utils/contract";

//INTERNAL CONTRACT FUNCTION IMPORT
import {
  fetchNFTs,
  fetchMyNFTsOrCreatedNFTs,
  fetchAuctionNFTs,
  fetchMyAuctionNFTs,
  getSingleNFTBids,
  getUserBids,
} from "../utils/NFTMarketplace";

import {
  loadTransferHistory,
  getUserTransferFundHistory,
} from "../utils/TransferFund";

import { getUserMessageHistory, loadSupportData } from "../utils/Support";
import {
  communityAllUser,
  communityuserFriendList,
  communityUserMessage,
} from "../utils/Community";

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const NFT_MARKETPLACE = "CryptoKing CK DAULAT HUSSIn";

  //GLOBAL STATE VARIABLE
  const router = useRouter();
  const nftCurrency = "ETH";
  const [notify, setNotify] = useState();
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState();

  //NFT CONTRACT
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const [auctionNFTInfo, setAuctionNFTInfo] = useState();
  const [nftBids, setNftBids] = useState([]);
  const [nftContractBalance, setNftContractBalance] = useState();
  const [nftListingFees, setNftListingFees] = useState();
  //TRANSFER FUND CONTRACT
  const [allTransferHistory, setAllTransferHistory] = useState([]);
  //SUPPORT CONTRACT
  const [allSupportMsg, setAllSupportMsg] = useState([]);
  //TOKEN SALE STATE VARIABLE
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const [nativeToken, setNativeToken] = useState();
  const [tokenHolders, setTokenHolders] = useState([]);
  const [tokenSale, setTokenSale] = useState();
  const [currentHolder, setCurrentHolder] = useState();

  //DONATION CONTRACT
  const [donationBalance, setDonationBalance] = useState();
  const [allDonorList, setAllDonorList] = useState([]);

  //CHECK WALLET CONNECTION
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install MateMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // console.log(accounts[0]);
      } else {
        console.log("NO ACCOUNT");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const convertBal = ethers.utils.formatEther(getBalance);
      setAccountBalance(convertBal);
      // console.log(convertBal);
    } catch (error) {
      console.log("NO CONNACTION");
    }
  };

  //CONNECT WALLET
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MateMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //NFT MARKETPLACE
  const INITAIL_NFTMARKETPLACE = async () => {
    try {
      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );

      //FETCH CONTRACT BALANCE
      const nftConBal = await NFT_MARKETPLACE_CONTRACT.getContractBalance();
      setNftContractBalance(
        ethers.utils.formatUnits(nftConBal.toString(), "ether")
      );

      //LISTING FEES
      const listingFee = await NFT_MARKETPLACE_CONTRACT.getListingPrice();
      setNftListingFees(
        ethers.utils.formatUnits(listingFee.toString(), "ether")
      );
    } catch (error) {
      console.log("INITIAL_NFTMARKETPLACE:", error);
    }
  };
  //TOKEN SALE
  const INITIAL_TOKENSALE = async () => {
    try {
      //GET USER ACCOUNT
      const account = await checkIfWalletConnected_NEW();

      //GET USER BALANCE
      const balance = await getBalance();
      setBalance(ethers.utils.formatEther(balance.toString()));
      setAddress(account);

      //TOKEN CONTRACT
      const TOKEN_CONTRACT = await CALLING_CONTRACT(
        THE_BLOCKCHAIN_CODER_ADDRESS,
        THE_BLOCKCHAIN_CODER_ABI
      );

      let tokenBalance;

      if (account) {
        tokenBalance = await TOKEN_CONTRACT.balanceOf(account);
      } else {
        tokenBalance = 0;
      }

      //CALLING TOKEN FUNCTION
      const tokenName = await TOKEN_CONTRACT.name();
      const tokenSymbol = await TOKEN_CONTRACT.symbol();
      const tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
      const tokenStandard = await TOKEN_CONTRACT.standard();
      const tokenHolders = await TOKEN_CONTRACT._userId();
      const tokenOwnerOfContract = await TOKEN_CONTRACT.ownerOfContract();
      const tokenAddress = await TOKEN_CONTRACT.address;

      const nativeToken = {
        tokenAddress: tokenAddress,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        tokenOwnerOfContract: tokenOwnerOfContract,
        tokenStandard: tokenStandard,
        tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply.toString()),
        tokenBalance: ethers.utils.formatEther(tokenBalance.toString()),
        tokenHolders: tokenHolders.toNumber(),
      };
      setNativeToken(nativeToken);

      //GETTING TOKEN HOLDER DATA
      const getTokenHolder = await TOKEN_CONTRACT.getTokenHolder();
      setTokenHolders(getTokenHolder);

      if (account) {
        const getTokenHolderData = await TOKEN_CONTRACT.getTokenHolderData(
          account
        );

        const currentHolder = {
          tokenId: getTokenHolderData[0].toNumber(),
          from: getTokenHolderData[1],
          to: getTokenHolderData[2],
          totalToken: ethers.utils.formatEther(
            getTokenHolderData[3].toString()
          ),
          tokenHolder: getTokenHolderData[4],
        };

        setCurrentHolder(currentHolder);
      }

      //TOKEN SALE CONTRACT

      const TOKEN_SALE_CONTRACT = await CALLING_CONTRACT(
        TOKEN_SALE_ADDRESS,
        TOKEN_SALE_ABI
      );

      const tokenPrice = await TOKEN_SALE_CONTRACT.tokenPrice();
      const tokenSold = await TOKEN_SALE_CONTRACT.tokensSold();
      const tokenSaleBalance = await TOKEN_CONTRACT.balanceOf(
        THE_BLOCKCHAIN_CODER_ADDRESS
      );

      const tokenSale = {
        tokenPrice: ethers.utils.formatEther(tokenPrice.toString()),
        tokenSaleBalance: ethers.utils.formatEther(tokenSaleBalance.toString()),
        tokenSold: tokenSold.toNumber(),
      };

      setTokenSale(tokenSale);
    } catch (error) {
      console.log(error);
    }
  };
  // DONATION
  const INITIAL_DONATION = async () => {
    try {
      const DONATION_CONTRACT = await CALLING_CONTRACT(
        DONATION_ADDRESS,
        DONATION_ABI
      );

      const donorList = await DONATION_CONTRACT.getAllDonors();

      const parsedDonorList = donorList.map((donor) => ({
        donor: donor.from,
        value: ethers.utils.formatUnits(donor.value.toString(), "ether"),
        timestamp: convertTime(
          donor.timestamp.toNumber() * 1000
        ).toLocaleDateString(),
      }));

      setAllDonorList(parsedDonorList);

      const donationBalance = await DONATION_CONTRACT.getContractBalance();
      setDonationBalance(ethers.utils.formatEther(donationBalance.toString()));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    INITAIL_NFTMARKETPLACE();
    INITIAL_TOKENSALE();
    INITIAL_DONATION();
    checkIfWalletConnected();
  }, [address]);

  //CREATE NFT
  const createSale = async (
    url,
    formInputPrice,
    tokenPrice,
    isReselling,
    id
  ) => {
    // console.log(url, formInputPrice, isReselling, id, tokenPrice);
    const price = ethers.utils.parseUnits(formInputPrice, "ether");

    const tokens = tokenPrice.toString();
    const _tokenPrice = ethers.utils.parseUnits(tokens, "ether");

    const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
      NFTMARKETPLACE_ADDRESS,
      NFTMARKETPLACE_ABI
    );

    // console.log(price, _tokenPrice);

    const listingPrice = await NFT_MARKETPLACE_CONTRACT.getListingPrice();

    const transaction = !isReselling
      ? await NFT_MARKETPLACE_CONTRACT.createToken(url, price, _tokenPrice, {
          value: listingPrice.toString(),
        })
      : await NFT_MARKETPLACE_CONTRACT.resellToken(id, price, {
          value: listingPrice.toString(),
        });
    setIsLoadingNFT(true);
    await transaction.wait();
    setIsLoadingNFT(false);
    router.push("/my-account");
  };

  //BUY NFT
  const buyNft = async (nft) => {
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
      NFTMARKETPLACE_ADDRESS,
      NFTMARKETPLACE_ABI
    );

    const transaction = await NFT_MARKETPLACE_CONTRACT.createMarketSale(
      nft.tokenId,
      {
        value: price,
      }
    );
    setIsLoadingNFT(true);
    await transaction.wait();
    setIsLoadingNFT(false);
  };

  //BUY NFT WITH NATIVE TOKEN
  const buyNFTerc20 = async (nft) => {
    try {
      const tokens = nft.tokenPrice.toString();
      const transferAmount = ethers.utils.parseEther(tokens);

      const TOKEN_CONTRACT = await CALLING_CONTRACT(
        THE_BLOCKCHAIN_CODER_ADDRESS,
        THE_BLOCKCHAIN_CODER_ABI
      );

      const transaction = await TOKEN_CONTRACT.transfer(
        nft.seller,
        transferAmount
      );
      setIsLoadingNFT(true);
      await transaction.wait();

      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );

      const transactionNFT = await NFT_MARKETPLACE_CONTRACT.buyNFTWithToken(
        nft.tokenId
      );

      await transactionNFT.wait();
      setIsLoadingNFT(false);

      router.push("/my-account");
    } catch (error) {
      console.log(error);
    }
  };

  //CREATE AUCTION
  const setAuction = async (nft, endDateTime) => {
    const { tokenId, price } = nft;
    const auctionPrice = ethers.utils.parseUnits(price.toString(), "ether");

    try {
      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );

      const transaction = await NFT_MARKETPLACE_CONTRACT.createAuctionListing(
        auctionPrice,
        Number(tokenId),
        Math.trunc(endDateTime)
      );
      setIsLoadingNFT(true);
      await transaction.wait();
      setIsLoadingNFT(false);
      router.push("/my-account");
    } catch (error) {
      console.log(error);
    }
  };

  //BIDDING NFT
  const bidAuction = async (tokenId, bidAmount) => {
    try {
      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );
      setIsLoadingNFT(true);
      const userBid = ethers.utils.parseUnits(bidAmount.toString(), "ether");
      const transaction = await NFT_MARKETPLACE_CONTRACT.bid(Number(tokenId), {
        value: userBid,
      });

      await transaction.wait();
      setIsLoadingNFT(false);
      router.push("my-account");
    } catch (error) {
      console.log(error);
    }
  };

  //NFT WITHDRAW FUNCTION FUND
  const nftWithdraw = async () => {
    try {
      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );
      setIsLoadingNFT(true);
      const transaction = await NFT_MARKETPLACE_CONTRACT.widthdraw();
      await transaction.wait();

      setIsLoadingNFT(false);
      setNotify("Successfully withdraw fund for NFT Contract");
    } catch (error) {
      console.log(error);
    }
  };

  //UPDATE NFT LISTING FEE
  const updateNFTListingFee = async (listingFee) => {
    try {
      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );
      setIsLoadingNFT(true);
      const newlistingFee = ethers.utils.parseUnits(
        listingFee.toString(),
        "ether"
      );

      const transaction = await NFT_MARKETPLACE_CONTRACT.updateListingPrice(
        newlistingFee
      );

      await transaction.wait();
      setIsLoadingNFT(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //WITHDRAW NFT BID
  const withdrawBid = async (tokenId, bidId) => {
    try {
      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );
      setIsLoadingNFT(true);
      const transaction = await NFT_MARKETPLACE_CONTRACT.widthdrawBid(
        Number(tokenId),
        Number(bidId)
      );

      await transaction.wait();
      setIsLoadingNFT(false);
      router.push("/my-account");
    } catch (error) {
      console.log(error);
    }
  };

  //COMPLETE AUCTION
  const completeAuction = async (tokenId) => {
    try {
      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );
      setIsLoadingNFT(true);
      const transaction = await NFT_MARKETPLACE_CONTRACT.completeAuction(
        Number(tokenId)
      );

      await transaction.wait();
      setIsLoadingNFT(false);
      router.push("my-account");
    } catch (error) {
      console.log(error);
    }
  };

  const getHigestBidder = async (tokenId) => {
    try {
      const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
        NFTMARKETPLACE_ADDRESS,
        NFTMARKETPLACE_ABI
      );
      setIsLoadingNFT(true);
      //HIGEST BIDDER
      const higestBidder = await NFT_MARKETPLACE_CONTRACT.getHighestBidder(
        Number(tokenId)
      );
      //HIGEST BIDDER BID
      const higestBidderAmount = await NFT_MARKETPLACE_CONTRACT.bids(
        Number(tokenId),
        higestBidder
      );

      //LIST OF BIDDERS
      const listOfBidders = await NFT_MARKETPLACE_CONTRACT.getBidders();

      const allBiddingList = [];

      listOfBidders.map(async (bidder) => {
        const singleBid = await NFT_MARKETPLACE_CONTRACT.bids(
          Number(tokenId),
          bidder
        );

        const single = {
          bidder,
          bidValue: ethers.utils.formatUnits(singleBid.toString(), "ether"),
        };

        allBiddingList.push(single);
      });

      setNftBids(allBiddingList.reverse());

      const higestBidUser = {
        address: higestBidder,
        value: ethers.utils.formatUnits(higestBidderAmount.toString(), "ether"),
      };
      setIsLoadingNFT(false);
      return higestBidUser;
    } catch (error) {
      console.log(error);
    }
  };

  //TRANSFER FUNDS
  const transferFunds = async (amount, name, description, recipient) => {
    try {
      const amountTransfer = ethers.utils.parseUnits(amount, "ether");

      const TRANSFER_FUND_CONTRACT = await CALLING_CONTRACT(
        TRANSFER_FUND_ADDRESS,
        TRANSFER_FUND_ABI
      );

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: recipient,
            // gas: "0x5208"
            value: amountTransfer._hex,
          },
        ],
      });

      const transferFunds = await TRANSFER_FUND_CONTRACT.transfer(
        recipient,
        name,
        description,
        amountTransfer
      );

      await transferFunds.wait();
    } catch (error) {
      console.log(error);
    }
  };

  //SEND MESSAGE
  const sendSupportMessage = async (name, title, message) => {
    try {
      const SUPPORT_CONTRACT = await CALLING_CONTRACT(
        SUPPORT_ADDRESS,
        SUPPORT_ABI
      );

      const support = await SUPPORT_CONTRACT.sendMessage(name, message, title);

      await support.wait();
    } catch (error) {
      console.log(error);
    }
  };

  //CREATE ACCOUNT
  const communityCreateAccount = async (name) => {
    try {
      const COMMUNITY_CONTRACT = await CALLING_CONTRACT(
        COMMUNITY_ADDRESS,
        COMMUNITY_ABI
      );

      const account = await checkIfWalletConnected_NEW();
      const communityAccount = account
        ? await COMMUNITY_CONTRACT.createAccount(name)
        : "";

      await communityAccount.wait();
      router.push("my-account");
    } catch (error) {
      console.log(error);
    }
  };

  //SEND MESSAGE
  const communitySendMessage = async (address, message) => {
    try {
      const COMMUNITY_CONTRACT = await CALLING_CONTRACT(
        COMMUNITY_ADDRESS,
        COMMUNITY_ABI
      );

      const communityAccount = await COMMUNITY_CONTRACT.sendMessage(
        address,
        message
      );

      await communityAccount.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //ADD FRIEND
  const communityAddFriend = async (address, name) => {
    try {
      const COMMUNITY_CONTRACT = await CALLING_CONTRACT(
        COMMUNITY_ADDRESS,
        COMMUNITY_ABI
      );

      const communityAccount = await COMMUNITY_CONTRACT.addFriend(
        address,
        name
      );

      await communityAccount.wait();
    } catch (error) {
      console.log(error);
    }
  };

  //BUY TOEKN
  const buyToken = async (nToken) => {
    try {
      const amount = ethers.utils.parseUnits(nToken.toString(), "ether");
      const TOKEN_SALE_CONTRACT = await CALLING_CONTRACT(
        TOKEN_SALE_ADDRESS,
        TOKEN_SALE_ABI
      );

      const buying = await TOKEN_SALE_CONTRACT.buyTokens(nToken, {
        value: amount.toString(),
      });

      await buying.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //INTERNAL FUNCTION OWNER
  const transferNativeToken = async (from) => {
    try {
      const tokens = from.amount.toString();
      const transferAmount = ethers.utils.parseEther(tokens);

      //TOKEN CONTRACT
      const TOKEN_CONTRACT = await CALLING_CONTRACT(
        THE_BLOCKCHAIN_CODER_ADDRESS,
        THE_BLOCKCHAIN_CODER_ABI
      );

      const transaction = await TOKEN_CONTRACT.transfer(
        from.address,
        transferAmount
      );

      await transaction.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //DONATE FUND
  const donate = async (amount) => {
    try {
      const DONATION_CONTRACT = await CALLING_CONTRACT(
        DONATION_ADDRESS,
        DONATION_ABI
      );

      const transferAmount = ethers.utils.parseUnits(
        amount.toString(),
        "ether"
      );

      const transaction = await DONATION_CONTRACT.donate({
        value: transferAmount.toString(),
      });

      await transaction.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //WITHDRAW DONATION
  const widthdraw = async (amount) => {
    try {
      const DONATION_CONTRACT = await CALLING_CONTRACT(
        DONATION_ADDRESS,
        DONATION_ABI
      );

      const transaction = await DONATION_CONTRACT.widthdraw();

      await transaction.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NFTContext.Provider
      value={{
        NFT_MARKETPLACE,
        nftCurrency,
        currentAccount,
        isLoadingNFT,
        auctionNFTInfo,
        nftContractBalance,
        nftListingFees,
        nftBids,
        notify,
        buyNFTerc20,
        getHigestBidder,
        updateNFTListingFee,
        completeAuction,
        withdrawBid,
        bidAuction,
        buyNft,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrCreatedNFTs,
        connectWallet,
        setAuction,
        fetchAuctionNFTs,
        fetchMyAuctionNFTs,
        nftWithdraw,
        setNftListingFees,
        getSingleNFTBids,
        getUserBids,
        //DONATION
        donate,
        donationBalance,
        allDonorList,
        widthdraw,
        //TOKEN SALE
        buyToken,
        nativeToken,
        tokenSale,
        transferNativeToken,
        tokenHolders,
        //TRANSFER FUNDS
        transferFunds,
        getUserTransferFundHistory,
        allTransferHistory,
        loadTransferHistory,

        // SUPPORT
        sendSupportMessage,
        getUserMessageHistory,
        allSupportMsg,
        loadSupportData,
        ///COMMUNIty
        communityAddFriend,
        communityAllUser,
        communityCreateAccount,
        communityuserFriendList,
        communityUserMessage,
        communitySendMessage,
        currentAccount,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
