import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { Input } from "../index";
import { NFTContext } from "../../context/NFTContext";

const DonateModal = ({ setOpenDonation }) => {
  const { donate } = useContext(NFTContext);
  const [donateAmount, setDonateAmount] = useState();
  return (
    <div className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn">
      <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-12 sm:px-12 bg-[#1a1a1a] first:text-gray-100">
        <button
          onClick={() => setOpenDonation(false)}
          className="absolute top-2 right-2"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold leadi tracki">
          Kindly provide your support
        </h2>
        <p className="flex-1 text-center dark:text-gray-400">
          Your fund we will be utilized in the improvement in the CryptoKing, an
          open source NFT Marketplace
        </p>
        <Input
          inputType="input"
          title="Amount"
          placeholder="Amount"
          handleClick={(e) => setDonateAmount(e.target.value)}
        />
        <button
          onClick={() => donate(donateAmount)}
          type="button"
          className="px-8 py-3 font-semibold rounded-full bg-[#705DF2] text-[#fff]"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default DonateModal;
