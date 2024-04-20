import React, { useContext, useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

///INTERNAL IMPORT
import { NFTContext } from "../context/NFTContext";
import {
  CreatorCard,
  NFTCard,
  Loader,
  SearchBar,
  Title,
  Action,
  Feature,
  HeroSection,
} from "../components/index";
import { getCreators } from "../utils/getTopCreators";
import { shortenAddress } from "../utils/shortenAddress";
import images from "../assets";

const index = () => {
  const { NFT_MARKETPLACE, fetchNFTs, communityAllUser } =
    useContext(NFTContext);

  //STATE VARIABLE
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [hideButtons, setHideButtons] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);
  const [activeSelect, setActiveSelect] = useState("Recently added");
  const [userLists, setUserLists] = useState([]);

  //FILTER BASED ON CATEGORY
  const nftImage = [];
  const nftAudio = [];
  const nftVideo = [];

  // const scrollRef = useRef(null);
  // const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const parentRef = useRef(null);

  const { theme } = useTheme();

  useEffect(() => {
    fetchNFTs().then((item) => {
      setNfts(item?.reverse());
      setNftsCopy(item);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case "Price (low to high)":
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "Price (high to low)":
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "Recently added":
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

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

  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth)
      return setHideButtons(false);
    return setHideButtons(true);
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable());

    return () => {
      window.removeEventListener("resize", isScrollable());
    };
  });

  const creators = nfts == undefined ? [] : getCreators(nfts);
  // console.log(creators);

  console.log(nfts);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <HeroSection />

        {!isLoading && !nftImage.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            That&apos;s sorry, No NFTs for Sale!
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-10">
              {/* IMAGE */}

              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-2xl font-semibold sm:mb-4">
                  Top Image NFTs
                </h1>

                <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nftImage
                  .map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)
                  .slice(0, 10)}
              </div>

              {nftAudio.length ? (
                <>
                  {/* NFT AUDIO */}
                  <Title title={"Audio"} styleClass="mt-24 mb-12" />

                  <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center accountAudio">
                    {nftAudio
                      .map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)
                      .slice(0, 6)}
                  </div>
                </>
              ) : (
                ""
              )}

              {nftAudio.length ? (
                <>
                  {/* NFT VIDEO */}
                  <Title title={"Video"} styleClass="mt-24 mb-12" />

                  <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center accountAudio">
                    {nftVideo
                      .map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)
                      .slice(0, 6)}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <Feature />

            {/* CREATORS */}
            <div>
              <Title title={`Best Creators`} styleClass={`mt-24 mb-12`} />

              <div
                className="relative  flex flex-1 max-w-full mt-3"
                ref={parentRef}
              >
                <div
                  className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                  ref={scrollRef}
                >
                  {creators.map((creator, i) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={i + 1}
                      creatorImage={images[`creator${i + 1}`]}
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={creator.sumall}
                      link="/community"
                    />
                  ))}

                  {!hideButtons && (
                    <>
                      <div
                        className="absolute w-8 h-8 minlg:w-12 top-45 cursor-pointer left-0"
                        onClick={() => handleScroll("left")}
                      >
                        <Image
                          src={images.left}
                          layout="fill"
                          objectFit="contain"
                          alt="left arrow"
                          className={
                            theme === "light" ? "filter invert" : undefined
                          }
                        />
                      </div>

                      <div
                        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                        onClick={() => handleScroll("right")}
                      >
                        <Image
                          src={images.right}
                          layout="fill"
                          objectFit="contain"
                          alt="left arrow"
                          className={
                            theme === "light" ? "filter invert" : undefined
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <Action />
      </div>
    </div>
  );
};

export default index;
