import React, { useState } from "react";

//internal IMPORT
import { shortenAddress } from "../../utils/shortenAddress";
import { AdminModal, Dot } from "../index";

const Table = ({ nft }) => {
  const [active, setActive] = useState(false);

  const [nftOpenDis, setNftOpenDis] = useState();

  return (
    <>
      <div className="container p-2 mx-auto sm:p-4 text-[#222222] dark:text-[#fff]">
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <colgroup>
              <col className="w-5" />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-5" />
            </colgroup>
            <thead>
              <tr className="bg-[#705df2] text-[#fff]">
                <th className="p-3">A-Z</th>
                <th className="p-3">Name</th>
                <th className="p-3">Seller</th>
                <th className="p-3">Owner</th>
                <th className="p-3">TokenID</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Auction</th>
                <th className="p-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            {nft
              .map((nft, i) => (
                <tbody
                  key={i + 1}
                  className="border-b dark:bg-[#1a1a1a] dark:border-gray-700"
                >
                  <tr>
                    <td className="px-3 py-2 text-2xl font-medium dark:text-gray-400">
                      <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img src={nft.image} alt={nft.name} />
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <p>{nft.name}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{shortenAddress(nft.seller)}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{shortenAddress(nft.owner)}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>#{nft.tokenId}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{nft.category}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{nft.price}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{nft.auction ? "Yes" : "No"}</p>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => setNftOpenDis(nft.description)}
                        type="button"
                        title="Open details"
                        className="p-1 rounded-full dark:text-gray-600 hover:dark:bg-gray-700 focus:dark:bg-gray-700"
                      >
                        <Dot callFunction={setActive} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))
              .slice(0, 10)}
          </table>
        </div>
      </div>
      {active && <AdminModal openNft={nftOpenDis} callFunction={setActive} />}
    </>
  );
};

export default Table;
