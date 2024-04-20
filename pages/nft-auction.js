import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import { NFTCard, Loader, Title, Banner } from "../components/index";
import { NFTContext } from "../context/NFTContext";

const nftAuction = () => {
  const { fetchAuctionNFTs } = useContext(NFTContext);

  const [fetchAuctionNFT, setFetchAuctionNFT] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAuctionNFTs().then((items) => {
      setFetchAuctionNFT(items?.reverse()), setIsLoading(false);
    });
  }, []);

  //FILTER BASED ON CATEGORY
  const nftImage = [];
  const nftAudio = [];
  const nftVideo = [];

  if (fetchAuctionNFT?.length) {
    fetchAuctionNFT?.map((el) => {
      if (el.category == "Image") {
        nftImage.push(el);
      } else if (el.category == "Audio") {
        nftAudio.push(el);
      } else {
        nftVideo.push(el);
      }
    });
  }

  console.log(nftImage);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={
            <>
              {" "}
              Top NFTS for Auction, <br /> CryptoKing{" "}
            </>
          }
          childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
          parentStyle={
            "justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-xl"
          }
        />

        {/* CARD */}

        {!isLoading && !nftImage.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            That's weird... No NFTs For Auction
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-10">
              {/* IMAGE */}

              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                  Top Image NFTs
                </h1>
              </div>

              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nftImage.map((nft) => (
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}
              </div>

              {/* //AUDIO */}
              {nftAudio.length ? (
                <>
                  <Title title={"Audio"} styleClass={"mt-24 mb-12"} />

                  <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                    {nftAudio.map((nft) => (
                      <NFTCard key={nft.tokenId} nft={nft} />
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}

              {/* //AUDIO */}
              {nftVideo.length ? (
                <>
                  <Title title={"Video"} styleClass={"mt-24 mb-12"} />

                  <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                    {nftVideo.map((nft) => (
                      <NFTCard key={nft.tokenId} nft={nft} />
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default nftAuction;
