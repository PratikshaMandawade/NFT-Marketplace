import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import { NFTContext } from "../context/NFTContext";
import { shortenAddress } from "../utils/shortenAddress";
import {
  Banner,
  Button,
  OwnedNFTs,
  ListedNFTs,
  Friends,
  Auction,
  TransferFunds,
  FeedBack,
  ImageNFT,
  Audio,
  Video,
  WithdrawBid,
} from "../components/index";
import images from "../assets";

const myAccount = () => {
  const { currentAccount } = useContext(NFTContext);
  const [openTab, setOpenTab] = useState("My NFTs");

  const activeTab = (e) => {
    const value = e.target.innerText;
    setOpenTab(value);
    console.log(value);
  };

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name={"Your CryptoKing NFTs"}
          childStyles={"text-center mb-4"}
          parentStyle={"h-80 justify-center"}
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              src={images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
            />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>

      <div className="sm:px-4 p-12 w-full minmd:w-4/5 pl-16">
        <Button
          btnName={"My NFTs"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Listed NFTs"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Listed Auction"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Image"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Audio"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Video"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5  rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Transfered Funds"}
          btnType={"primary"}
          classStyle={"mr-5 sm:mr-4 sm:mb-5 rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Friends"}
          btnType={"primary"}
          classStyle={"mt-5 sm:mt-0 mr-5 sm:mr-4  sm:mb:5 rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"FeedBack"}
          btnType={"primary"}
          classStyle={"mt-5 sm:mt-0 mr-5 sm:mr-4  sm:mb:5 rounded"}
          handleClick={(e) => activeTab(e)}
        />
        <Button
          btnName={"Withdraw Bid"}
          btnType={"primary"}
          classStyle={"mt-5 sm:mt-0 mr-5 sm:mr-4  sm:mb:5 rounded"}
          handleClick={(e) => activeTab(e)}
        />
      </div>

      {/* //COMPONENTS */}
      {openTab == "My NFTs" ? (
        <OwnedNFTs />
      ) : openTab == "Listed NFTs" ? (
        <ListedNFTs />
      ) : openTab == "Listed Auction" ? (
        <Auction />
      ) : openTab == "Image" ? (
        <ImageNFT />
      ) : openTab == "Audio" ? (
        <Audio />
      ) : openTab == "Video" ? (
        <Video />
      ) : openTab == "Transfered Funds" ? (
        <TransferFunds />
      ) : openTab == "Friends" ? (
        <Friends />
      ) : openTab == "FeedBack" ? (
        <FeedBack />
      ) : (
        <WithdrawBid />
      )}
    </div>
  );
};

export default myAccount;
