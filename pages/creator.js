import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import { CreatorCard, Action, Banner, Title } from "../components/index";
import { NFTContext } from "../context/NFTContext";
import { getCreators } from "../utils/getTopCreators";
import { shortenAddress } from "../utils/shortenAddress";
import images from "../assets";

const creator = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items?.reverse());
    });
  }, []);

  const creators = nfts == undefined ? [] : getCreators(nfts);
  console.log(creators);
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={
            <>
              Discover, all NFTs <br /> creators
            </>
          }
          childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
          parentStyle={
            "justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded"
          }
        />

        <div>
          <Title title={"Best Creators"} styleClass={"mt-24 mb-12"} />

          <div className="relative flex-1 max-w-full flex mt-3">
            <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none">
              {creators.map((creator, i) => (
                <CreatorCard
                  key={creator.seller}
                  rank={i + 1}
                  creatorImage={images[`creator${i + 1}`]}
                  creatorName={shortenAddress(creator.seller)}
                  creatorEths={creator.sumall}
                  link={"/community"}
                />
              ))}
            </div>
          </div>

          <Action />
        </div>
      </div>
    </div>
  );
};

export default creator;
