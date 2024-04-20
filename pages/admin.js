import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import {
  AdminSideBar,
  AdminDashbord,
  AdminNFTs,
  AdminCharity,
  AdminCreator,
  AdminToken,
  AdminCommunity,
  AdminAuction,
  AdminTransfer,
  AdminFeedback,
  AdminFunction,
  OnlyAdmin,
  setNftListingFees,
} from "../components/index";
import { NFTContext } from "../context/NFTContext";
import { getCreators } from "../utils/getTopCreators";

const admin = () => {
  const {
    fetchNFTs,
    communityAllUser,
    loadTransferHistory,
    loadSupportData,
    allDonorList,
    tokenHolders,
    fetchAuctionNFTs,
    widthdraw,
    nftContractBalance,
    nftWithdraw,
    donationBalance,
    nftListingFees,
    currentAccount,
    updateNFTListingFee,
  } = useContext(NFTContext);

  //STATE VARIABLE
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLists, setUserLists] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Dashbord");
  const [auctionNFTs, setAuctionNFTs] = useState([]);
  const [allTransferHistory, setAllTransferHistory] = useState([]);
  const [allSupportMsg, setAllSupportMsg] = useState([]);

  // const adminAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const adminAddress = "0x9911B15A7f6d1450cc66687c2032C996931D51b5";

  //CALLING FUNCTION
  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item?.reverse());
    });

    fetchAuctionNFTs().then((items) => {
      setAuctionNFTs(items);
    });

    loadTransferHistory().then((items) => {
      setAllTransferHistory(items);
    });

    loadSupportData().then((items) => {
      setAllSupportMsg(items);
    });

    communityAllUser().then((items) => {
      setUserLists(items);
      setIsLoading(false);
    });
  }, []);

  //CREATE DATA
  const creators = nfts == undefined ? [] : getCreators(nfts);

  //FILTER BASED ON CATEGORY
  const nftImage = [];
  const nftAudio = [];
  const nftVideo = [];

  if (nfts?.length) {
    nfts?.map((el) => {
      if (el.category == "Image") {
        nftImage.push(el);
      } else if (el.category == "Audio") {
        nftAudio.push(el);
      } else {
        nftVideo.push(el);
      }
    });
  }

  return (
    <div className="flex dark:bg-[#1a1a1a] min-h-screen">
      {adminAddress.toLowerCase() == currentAccount.toLowerCase() ? (
        <>
          <AdminSideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

          {activeMenu == "Dashbord" ? (
            <AdminDashbord
              nftImage={nftImage}
              nftAudio={nftAudio}
              nftVideo={nftVideo}
              creators={creators}
              nftLength={nfts}
              userListsLength={userLists}
              allTransferHistoryLength={allTransferHistory}
              allSupportMsgLength={allSupportMsg}
              allDonorListLength={allDonorList}
              tokenHoldersLength={tokenHolders}
              auctionNFTInfoLength={auctionNFTs}
            />
          ) : activeMenu == "NFTs" ? (
            <AdminNFTs
              nftImage={nftImage}
              nftAudio={nftAudio}
              nftVideo={nftVideo}
            />
          ) : activeMenu == "Community" ? (
            <AdminCommunity creators={userLists} />
          ) : activeMenu == "Charity" ? (
            <AdminCharity allDonorList={allDonorList} />
          ) : activeMenu == "Creator" ? (
            <AdminCreator creators={creators} />
          ) : activeMenu == "Token" ? (
            <AdminToken />
          ) : activeMenu == "Auction" ? (
            <AdminAuction />
          ) : activeMenu == "Transfer" ? (
            <AdminTransfer />
          ) : activeMenu == "Function" ? (
            <AdminFunction
              widthdraw={widthdraw}
              nftContractBalance={nftContractBalance}
              nftWithdraw={nftWithdraw}
              donationBalance={donationBalance}
              nftListingFees={nftListingFees}
              setNftListingFees={setNftListingFees}
              updateNFTListingFee={updateNFTListingFee}
            />
          ) : (
            <AdminFeedback />
          )}
        </>
      ) : (
        <OnlyAdmin />
      )}
    </div>
  );
};

export default admin;
