import { ethers } from "ethers";
import axios from "axios";
import { convertTime } from "../utils/time";

import {
  NFTMARKETPLACE_ABI,
  NFTMARKETPLACE_ADDRESS,
} from "../context/constants";
import {
  getBalance,
  checkIfWalletConnected_NEW,
  CALLING_CONTRACT,
} from "./contract";

//NFT CONTRACT FUNCTION
export const fetchNFTs = async () => {
  try {
    const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
      NFTMARKETPLACE_ADDRESS,
      NFTMARKETPLACE_ABI
    );

    const data = await NFT_MARKETPLACE_CONTRACT.fetchMarketItems();

    const items = await Promise.all(
      data.map(
        async ({
          tokenId,
          auction,
          seller,
          owner,
          price: unformattedPrice,
          sold,
          startAt,
          endAt,
          netPrice,
          tokenPrice,
        }) => {
          const tokenURI = await NFT_MARKETPLACE_CONTRACT.tokenURI(tokenId);
          const {
            data: { image, name, description, category },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            id: tokenId.toNumber(),
            seller,
            auction,
            owner,
            image,
            name,
            description,
            tokenURI,
            category,
            sold,
            startAt: new Date(startAt * 1000).toDateString(),
            endAt: new Date(endAt * 1000).toDateString(),
            netPrice: ethers.utils.formatUnits(netPrice.toString(), "ether"),
            endTimstamp: endAt.toNumber(),
            tokenPrice: ethers.utils.formatUnits(
              tokenPrice.toString(),
              "ether"
            ),
          };
        }
      )
    );

    return items;
  } catch (error) {
    console.log(error);
  }
};

//FETCH LISTED AND CREATED NFTS
export const fetchMyNFTsOrCreatedNFTs = async (type) => {
  try {
    const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
      NFTMARKETPLACE_ADDRESS,
      NFTMARKETPLACE_ABI
    );

    const data =
      type === "fetchItemsListed"
        ? await NFT_MARKETPLACE_CONTRACT.fetchItemsListed()
        : await NFT_MARKETPLACE_CONTRACT.fetchMyNFTs();

    const items = await Promise.all(
      data.map(
        async ({
          tokenId,
          auction,
          seller,
          owner,
          price: unformattedPrice,
          sold,
          startAt,
          endAt,
          netPrice,
          tokenPrice,
        }) => {
          const tokenURI = await NFT_MARKETPLACE_CONTRACT.tokenURI(tokenId);
          const {
            data: { image, name, description, category },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            id: tokenId.toNumber(),
            seller,
            auction,
            owner,
            image,
            name,
            description,
            tokenURI,
            category,
            sold,
            startAt: new Date(startAt * 1000).toDateString(),
            endAt: new Date(endAt * 1000).toDateString(),
            netPrice: ethers.utils.formatUnits(netPrice.toString(), "ether"),
            endTimstamp: endAt.toNumber(),
            tokenPrice: ethers.utils.formatUnits(
              tokenPrice.toString(),
              "ether"
            ),
          };
        }
      )
    );

    return items;
  } catch (error) {
    console.log(error);
  }
};

//FETCH AUCTION NFTs
export const fetchAuctionNFTs = async () => {
  try {
    const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
      NFTMARKETPLACE_ADDRESS,
      NFTMARKETPLACE_ABI
    );

    const data = await NFT_MARKETPLACE_CONTRACT.fetchMarketAuctionItems();

    const items = await Promise.all(
      data.map(
        async ({
          tokenId,
          auction,
          seller,
          owner,
          price: unformattedPrice,
          sold,
          startAt,
          endAt,
          netPrice,
          tokenPrice,
        }) => {
          const tokenURI = await NFT_MARKETPLACE_CONTRACT.tokenURI(tokenId);
          const {
            data: { image, name, description, category },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            id: tokenId.toNumber(),
            seller,
            auction,
            owner,
            image,
            name,
            description,
            tokenURI,
            category,
            sold,
            startAt: new Date(startAt * 1000).toDateString(),
            endAt: new Date(endAt * 1000).toDateString(),
            netPrice: ethers.utils.formatUnits(netPrice.toString(), "ether"),
            endTimstamp: endAt.toNumber(),
            tokenPrice: ethers.utils.formatUnits(
              tokenPrice.toString(),
              "ether"
            ),
          };
        }
      )
    );

    return items;
  } catch (error) {
    console.log(error);
  }
};

//FETCH MY AUCTION NFTS
export const fetchMyAuctionNFTs = async () => {
  try {
    const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
      NFTMARKETPLACE_ADDRESS,
      NFTMARKETPLACE_ABI
    );

    const data = await NFT_MARKETPLACE_CONTRACT.fetchItemsAuctionListed();

    const items = await Promise.all(
      data.map(
        async ({
          tokenId,
          auction,
          seller,
          owner,
          price: unformattedPrice,
          sold,
          startAt,
          endAt,
          netPrice,
          tokenPrice,
        }) => {
          const tokenURI = await NFT_MARKETPLACE_CONTRACT.tokenURI(tokenId);
          const {
            data: { image, name, description, category },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            id: tokenId.toNumber(),
            seller,
            auction,
            owner,
            image,
            name,
            description,
            tokenURI,
            category,
            sold,
            startAt: new Date(startAt * 1000).toDateString(),
            endAt: new Date(endAt * 1000).toDateString(),
            netPrice: ethers.utils.formatUnits(netPrice.toString(), "ether"),
            endTimstamp: endAt.toNumber(),
            tokenPrice: ethers.utils.formatUnits(
              tokenPrice.toString(),
              "ether"
            ),
          };
        }
      )
    );

    return items;
  } catch (error) {
    console.log(error);
  }
};

//GET USER BIDS
export const getUserBids = async () => {
  try {
    const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
      NFTMARKETPLACE_ADDRESS,
      NFTMARKETPLACE_ABI
    );

    const userBids = await NFT_MARKETPLACE_CONTRACT.fetchUserBids();

    const parsedSingleBidList = userBids.map((bid) => ({
      bidAddress: bid.bidAddress,
      tokenId: bid.tokenId.toNumber(),
      bidId: bid.bidId.toNumber(),
      value: ethers.utils.formatUnits(bid.bidAmount.toString(), "ether"),
      timestamp: bid.bitEnding.toNumber() * 1000,
      endDate: convertTime(
        bid.bitEnding.toNumber() * 1000
      ).toLocaleDateString(),
    }));

    return parsedSingleBidList.reverse();
  } catch (error) {
    console.log(error);
  }
};

// //GET SINGLE NFT BIDS
export const getSingleNFTBids = async (tokenId) => {
  try {
    const NFT_MARKETPLACE_CONTRACT = await CALLING_CONTRACT(
      NFTMARKETPLACE_ADDRESS,
      NFTMARKETPLACE_ABI
    );

    const allBids = await NFT_MARKETPLACE_CONTRACT.fetchNFTBids(
      Number(tokenId)
    );

    const parsedSingleBidList = allBids.map((bid) => ({
      bidAddress: bid.bidAddress,
      value: ethers.utils.formatUnits(bid.bidAmount.toString(), "ether"),
      timestamp: bid.bitEnding.toNumber() * 1000,
      endDate: convertTime(
        bid.bitEnding.toNumber() * 1000
      ).toLocaleDateString(),
    }));

    return parsedSingleBidList.reverse();
  } catch (error) {
    console.log(error);
  }
};
