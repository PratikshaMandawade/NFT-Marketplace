import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { NFTContext } from "../../context/NFTContext";
import { NFTCard, Action, Banner, Title } from "../../components/index";

const nfts = () => {
  //STATE VARIABLE
  const [nfts, setNfts] = useState([]);

  const { fetchNFTs } = useContext(NFTContext);

  const router = useRouter();
  const slug = router.query.category;

  console.log(slug);

  const nftImage = [];
  const nftAudio = [];
  const nftVideo = [];

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item?.reverse());
    });
  }, []);

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

  // console.log(nftAudio);
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={<> Discover, collect and sell</>}
          childStyles="md:text-4xl sm:text-2xl xs:text-sl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-xl"
        />

        <div className="mt-10">
          {/* IMAGE */}
          <Title title={slug} />

          {/* NFT IMAGE */}
          {slug == "image" && (
            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
              {nftImage.map((nft) => (
                <NFTCard key={nft.tokenId} nft={nft} />
              ))}
            </div>
          )}
          {/* NFT Audio */}
          {slug == "audio" && (
            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center accountVideo">
              {nftAudio.map((nft) => (
                <NFTCard key={nft.tokenId} nft={nft} />
              ))}
            </div>
          )}
          {/* NFT Video */}
          {slug == "video" && (
            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center accountVideo">
              {nftVideo.map((nft) => (
                <NFTCard key={nft.tokenId} nft={nft} />
              ))}
            </div>
          )}

          <Action />
        </div>
      </div>
    </div>
  );
};

export default nfts;
