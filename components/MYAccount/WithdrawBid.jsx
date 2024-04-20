import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";

///INTERNAL IMPORT
import { NFTContext } from "../../context/NFTContext";
import { Loader, Button } from "../../components/index";
import images from "../../assets";
import { shortenAddress } from "../../utils/shortenAddress";

const WithdrawBid = () => {
  const { getUserBids, withdrawBid } = useContext(NFTContext);
  const [userBids, setUserBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserBids().then((item) => {
      setUserBids(item);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  console.log(userBids);
  return (
    <>
      {!isLoading && userBids?.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            Sorry you have not bid in any NFTs
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5  flex-col">
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
                  <th className="p-3">#ID</th>
                  <th className="p-3">Creator</th>
                  <th className="p-3">Bid Amount</th>
                  <th className="p-3">TokenId</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Withdraw Bid</th>
                </tr>
              </thead>

              {userBids?.map((nft, i) => (
                <tbody
                  key={i + 1}
                  className="border-b dark:bg-[#1a1a1a] dark:border-gray-700"
                >
                  <tr>
                    <td className="px-3 py-2 text-2xl font-medium dark:text-gray-400">
                      <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img
                          src={`assets/creator${i + 1}.png`}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                    </td>

                    <td className="px-3 py-2">
                      <p>#{i + 1}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{shortenAddress(nft.bidAddress)}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{nft.value}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{nft.tokenId}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>
                        {Date.now() >= new Date(nft?.timestamp)
                          ? "Auction Is Ended"
                          : "Auction is going On"}
                      </p>
                    </td>
                    <td className="px-3 py-2">
                      {Date.now() >= new Date(nft?.timestamp) ? (
                        <Button
                          btnName={`Withdraw Bid`}
                          btnType={"primary"}
                          classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded py-2 mt-2"}
                          handleClick={() =>
                            withdrawBid(nft?.tokenId, nft?.bidId)
                          }
                        />
                      ) : (
                        <Button
                          btnName={`You can't withdraw Now`}
                          btnType={"primary"}
                          classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded py-2 mt-2"}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawBid;
