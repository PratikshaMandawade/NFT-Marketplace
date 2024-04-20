import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { Loader, NFTCard, Title } from "../index";
import { NFTContext } from "../../context/NFTContext";
import { shortenAddress } from "../../utils/shortenAddress";

const AdminAuction = () => {
  const { fetchAuctionNFTs } = useContext(NFTContext);

  //STATE VARIABL
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //CALLING FUNCTION
  useEffect(() => {
    fetchAuctionNFTs().then((item) => {
      setNfts(item.reverse());
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

  return (
    <>
      {!isLoading && nfts.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            NO NFTs owned
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <Title title={"NFTs listed for Auction"} />
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAuction;
