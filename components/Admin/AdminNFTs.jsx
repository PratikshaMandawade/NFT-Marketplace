import React from "react";

//INTERNAL IMPORT
import {
  Arrow,
  ArrowDown,
  Title,
  Student,
  DashBordCard,
  NFTCard,
} from "../index";

const AdminNFTs = ({ nftImage, nftAudio, nftVideo }) => {
  return (
    <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
      <section className="grid grid-cols-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashBordCard
          icon={<Arrow />}
          title={"Image"}
          number={nftImage.length}
        />
        <DashBordCard
          icon={<Student />}
          title={"Video"}
          number={nftVideo.length}
        />
        <DashBordCard
          icon={<Arrow />}
          title={"Audio"}
          number={nftAudio.length}
        />
      </section>

      {nftImage.length ? (
        <>
          {/* {NFT IMAGE} */}
          <Title title={"Image"} styleClass={"mt-24 mb-12"} />
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nftImage.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
      {nftVideo.length ? (
        <>
          {/* {NFT Video} */}
          <Title title={"Video"} styleClass={"mt-24 mb-12"} />
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center accountVideo">
            {nftVideo.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
      {nftAudio.length ? (
        <>
          {/* {NFT AUDIO} */}
          <Title title={"Audio"} styleClass={"mt-24 mb-12"} />
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center accountVideo">
            {nftAudio.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminNFTs;
