import React, { useContext, useEffect, useState, useRef } from "react";

///INTERNAL IMPORT
import { NFTContext } from "../../context/NFTContext";
import { NFTCard, Loader, SearchBar, Title } from "../../components/index";

const ListedNFTs = () => {
  const { fetchMyNFTsOrCreatedNFTs } = useContext(NFTContext);
  //STATE VARIABLE
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMyNFTsOrCreatedNFTs("fetchItemsListed").then((item) => {
      setNfts(item);
      setNftsCopy(item);
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
    <>
      {!isLoading && nfts?.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            No NFTs Listed
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          {nftImage.length ? (
            <>
              <Title title={"Listed Images"} />

              <div className="mt-3 w-full flex flex-wrap">
                {nftImage.map((nft) => (
                  <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage />
                ))}
              </div>
            </>
          ) : (
            ""
          )}
          {nftAudio.length ? (
            <>
              <Title title={"Listed Audio"} />

              <div className="mt-3 w-full flex flex-wrap accountAudio">
                {nftAudio.map((nft) => (
                  <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage />
                ))}
              </div>
            </>
          ) : (
            ""
          )}
          {nftVideo.length ? (
            <>
              <Title title={"Listed Images"} />

              <div className="mt-3 w-full flex flex-wrap accountVideo">
                {nftVideo.map((nft) => (
                  <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage />
                ))}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default ListedNFTs;
