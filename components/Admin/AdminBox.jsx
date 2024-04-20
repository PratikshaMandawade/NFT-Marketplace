import React from "react";

//INTERNAL IMPORT
import { Table } from "../../components/index";

const AdminBox = ({ nftImage }) => {
  return (
    <div className="row-span-3 dark:bg-[#222222] shadow rounded-lg">
      <div className="flex items-center justify-between px-6 py-5 font-semibold">
        <span className="dark:text-[#fff] text-[#222222]">
          Recents uploaded nfts
        </span>
      </div>
      <div className="overflow-y-auto">
        <Table nft={nftImage} />
      </div>
    </div>
  );
};

export default AdminBox;
