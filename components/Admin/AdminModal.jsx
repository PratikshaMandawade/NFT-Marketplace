import React from "react";

//INTERNAL IMPORT
import { Notification } from "../index";

const AdminModal = ({ openNft, callFunction }) => {
  return (
    <div className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn">
      <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-gray-900 dark:text-gray-100">
        <h2 className="flex items-center gap-2 text-2xl font-semibold leadi tracki">
          <Notification />
          NFT Description
        </h2>
        <p className="flex-1 dark:text-gray-400">{openNft}</p>
        <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
          <button
            onClick={() => callFunction(false)}
            className="px-6 py-2 rounded-sm shadow-sm bg-[#705df2] dark:text-[#fff]"
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
