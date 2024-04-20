import React from "react";

//INTERNAL IMPORT
import {
  Arrow,
  AdminBox,
  Add,
  ArrowDown,
  Edit,
  Read,
  Student,
  Clock,
  DashBordCard,
  TableTwo,
} from "../index";

const AdminDashbord = ({
  nftImage,
  nftAudio,
  nftVideo,
  creators,
  nftLength,
  userListsLength,
  allTransferHistoryLength,
  allSupportMsgLength,
  allDonorListLength,
  tokenHoldersLength,
  auctionNFTInfoLength,
}) => {
  return (
    <div className="flex-grow text-[#fff]">
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2 text-[#1a1a1a] dark:text-[#fff]">
              Dashboard
            </h1>
            <h2 className="text-[#705df2] ml-0.5">CruptoKing Nft overviews</h2>
          </div>

          <div className="flex flex-wrap items-start justify-end -mb-3">
            <button className="inline-flex px-5 py-3 text-white bg-[#705df2] hover:bg[#705df2] focus:bg-[#705df2] rounded-md ml-6 mb-3">
              <Edit />
              Manage dashboard
            </button>
            <button className="inline-flex px-5 py-3 text-white bg-[#705df2] hover:bg[#705df2] focus:bg-[#705df2] rounded-md ml-6 mb-3">
              <Edit />
              <a href="mailto:support@daulathussain.com">Send Email</a>
            </button>
          </div>
        </div>

        <section className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <DashBordCard
            icon={<Arrow />}
            title="NFTs"
            number={nftLength?.length}
          />
          <DashBordCard
            icon={<Student />}
            title="NFTs Auction"
            number={auctionNFTInfoLength?.length}
          />
          <DashBordCard
            icon={<ArrowDown />}
            title="Creators"
            number={creators?.length}
          />
          <DashBordCard
            icon={<Read />}
            title="Community"
            number={userListsLength?.length}
          />
          <DashBordCard
            icon={<Student />}
            title="Token Users"
            number={tokenHoldersLength?.length}
          />
          <DashBordCard
            icon={<Clock />}
            title="Donors"
            number={allDonorListLength?.length}
          />
          <DashBordCard
            icon={<Student />}
            title="Transfer"
            number={allTransferHistoryLength?.length}
          />
          <DashBordCard
            icon={<Clock />}
            title="FeedBack"
            number={allSupportMsgLength?.length}
          />
        </section>

        <section className="sm:hidden md:hidden grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <AdminBox nftImage={nftImage} />

          <div className="flex flex-col row-span-3 dark:bg-[#222222] shadow rounded-lg">
            <div className="px-6 py-5 font-semibold dark:text-[#fff] text-[#222222]">
              Recent nft Creators list
            </div>

            <TableTwo creators={creators} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashbord;
