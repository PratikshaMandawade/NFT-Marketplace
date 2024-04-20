import React, { useState, useEffect, useContext } from "react";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import Image from "next/image";

//INTERNAL IMPORT
import { NFTContext } from "../context/NFTContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Button, Loader, Modal, Input, Bid } from "../components/index";
import images from "../assets";

//MODAL PAYMENT COMPONENT

const PaymentBodyCmp = ({ nft, nftCurrency }) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Item
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Subtotal
      </p>
    </div>

    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image
            src={nft.image || images[`nft${nft.i}`]}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {shortenAddress(nft.seller)}
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
            {nft.name}
          </p>
        </div>
      </div>

      <div>
        <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
    </div>

    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Total
      </p>

      <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">
        {nft.price} <span className="font-semibold">{nftCurrency}</span>
      </p>
    </div>
  </div>
);

const nftDetails = () => {
  //CONTEXT IMPORT
  const {
    nftCurrency,
    buyNft,
    currentAccount,
    isLoadingNFT,
    setAuction,
    bidAuction,
    nftBids,
    withdrawBid,
    completeAuction,
    getHigestBidder,
    buyNFTerc20,
    getSingleNFTBids,
  } = useContext(NFTContext);

  const [nft, setNft] = useState({
    image: "",
    itemId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    category: "",
    auction: "",
    description: "",
    sold: "",
    startAt: "",
    endAt: "",
    netPrice: "",
    endTimstamp: "",
  });

  //STATE VARIABLE
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [auctionModal, setAuctionModal] = useState(false);
  const [bidAmount, setBidAmount] = useState();
  const [currentHigestBidder, setCurrentHigestBidder] = useState();
  const [singleNFTBids, setSingleNFTBids] = useState([]);

  //AUCTION NFT
  const [auctionNFT, setAuctionNFT] = useState({
    tokenId: nft.tokenId,
    price: "",
    endDate: "",
  });

  //ROUTER DATA URL
  const router = useRouter();

  useEffect(() => {
    // disable body scroll when navbar is open
    if (paymentModal || successModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [paymentModal, successModal]);

  // LOAD DAtA FROM ROUTER
  useEffect(() => {
    if (!router.isReady) return;

    setNft(router.query);
    setAuctionNFT({ ...auctionNFT, tokenId: router.query.tokenId });
    loadData(router.query.tokenId);
    loadSingleBids(router.query.tokenId);

    setIsLoading(false);
  }, [router.isReady]);

  //LOAD DATA HIGGEST BIDDER
  const loadData = async (tokenId) => {
    const higestHolder = await getHigestBidder(tokenId);
    setCurrentHigestBidder(higestHolder);
  };

  //LOAD ALL BIDS SINGLE NFT
  const loadSingleBids = async (tokenId) => {
    const data = await getSingleNFTBids(tokenId);

    setSingleNFTBids(data);
  };

  //CHECK OUT FUNCTION
  const checkout = async () => {
    await buyNft(nft);

    setPaymentModal(false);
    setSuccessModal(true);
  };

  //BUY NFT WITH NATIVE TOKEN
  const buyNativeToken = async () => {
    await buyNFTerc20(nft);

    setPaymentModal(false);
    setSuccessModal(true);
  };

  //UPDATE DATE
  const handleFormFieldChange = (fileName, e) => {
    setAuctionNFT({ ...auctionNFT, [fileName]: e.target.value });
  };

  const callAuction = async () => {
    if (auctionNFT.tokenId && auctionNFT.price && auctionNFT.endDate) {
      const futureTime = new Date(auctionNFT.endDate).getTime() / 1000;
      const currentTimeSecond = new Date().getTime() / 1000;

      const endDateTime = futureTime - currentTimeSecond;

      if (endDateTime) {
        await setAuction(auctionNFT, endDateTime);
      } else {
        console.log("Please provide date");
      }
    }
  };

  //STOPE ZERO ADDRESS
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  if (isLoading) return <Loader />;

  // console.log(nft);

  // console.log(nft?.endTimstamp * 1000);
  // console.log(Date.now());
  // console.log(Date.now() >= nft?.endTimstamp * 1000);

  //   <>
  //   {/* //WITHDRAW BID */}
  //   <Button
  //     btnName={`Withdraw Bid`}
  //     btnType={"primary"}
  //     classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded py-4 mt-4"}
  //     handleClick={() => withdrawBid(nft.tokenId)}
  //   />
  // </>

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          {nft.category == "Image" ? (
            <Image
              src={nft.image || images[`nft${nft.i}`]}
              layout="fill"
              objectFit="cover"
              alt="image"
            />
          ) : nft.category == "Audio" ? (
            <>
              <Image
                src={images.wave}
                layout="fill"
                objectFit="cover"
                alt="image"
              />

              <audio controls className="createPagePlayer changePosition">
                <source src={nft.image} type="audio/ogg" />
                <source src={nft.image} type="audio/mpeg" />
                Your browser dose not support the audio tag
              </audio>
            </>
          ) : (
            <video
              src={nft.image}
              color="#705df2"
              className="createPageVideo"
              controls
            ></video>
          )}
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {nft.name}
          </h2>
        </div>

        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>

          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-lg font-semibold">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>

        {/* //DETAILS */}
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 font-medium text-base mb-2">
              Details
            </p>
          </div>

          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base">
              {nft.description}
            </p>
            <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
              <strong>Category: </strong>
              {nft.category}
            </p>
            <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
              <strong>TokenId: </strong>
              {nft.tokenId}
            </p>
            <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
              <strong>NFT Price: </strong>
              {nft.price} {nftCurrency}
            </p>
          </div>

          {/* DISPLAY AUCTION DETAILS  */}

          {nft.auction === "true" && (
            <>
              <div className="mt-3 detail-page-flex">
                <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
                  <strong>Auction: </strong>
                  {nft.auction ? "Auction is ongoing" : "Auction End"}
                </p>
                <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
                  <strong>Bid Start From: </strong>
                  {nft?.netPrice}
                  {nftCurrency}
                </p>
                <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
                  <strong>StartAt: </strong>
                  {nft?.startAt}
                </p>
                <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
                  <strong>End Date: </strong>
                  {nft?.endAt}
                </p>
                <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
                  <strong>Time Left: </strong>
                  <Countdown date={new Date(nft?.endTimstamp * 1000)} />
                </p>

                <p className="mt-2 font-poppins dark:text-white text-nft-black-1 font-normal text-base">
                  <strong>Higest Bidder: </strong>
                  {shortenAddress(currentHigestBidder?.address)}
                </p>
              </div>

              {/* //BIDDER DATA COMPONENTS */}
              {nftBids.length ? <Bid creators={singleNFTBids} /> : ""}

              {/* //ADD BIDDING */}
              {currentAccount === nft.seller.toLowerCase() ? (
                <>
                  {/* COMPLETE AUCTION Seller*/}
                  {Date.now() >= new Date(nft?.endTimstamp * 1000) &&
                    currentAccount === nft.seller.toLowerCase() && (
                      <Button
                        btnName={`Complete Auction`}
                        btnType={"primary"}
                        classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded py-4 mt-4"}
                        handleClick={() => completeAuction(nft.tokenId)}
                      />
                    )}
                </>
              ) : currentAccount ===
                currentHigestBidder?.address.toLowerCase() ? (
                <>
                  {/* COMPLETE AUCTION  Winner*/}
                  {Date.now() >= new Date(nft?.endTimstamp * 1000) &&
                    currentAccount ===
                      currentHigestBidder?.address.toLowerCase() && (
                      <Button
                        btnName={`Complete Auction`}
                        btnType={"primary"}
                        classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded py-4 mt-4"}
                        handleClick={() => completeAuction(nft.tokenId)}
                      />
                    )}

                  {/* //DISPLAY HIGEST BIDDER */}

                  <Button
                    btnName={`Yout are the Higgest Bidder ${currentHigestBidder?.value} ${nftCurrency}`}
                    btnType={"primary"}
                    classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded py-4 mt-4"}
                  />
                </>
              ) : (
                <>
                  <Input
                    inputType={"number"}
                    title={"place your Bid"}
                    placeholder={"enter your bid"}
                    handleClick={(e) => setBidAmount(e.target.value)}
                  />

                  <Button
                    btnName={"Bid"}
                    btnType={"primary"}
                    classStyle={"mr-5 sm:mr-0 sm:mb-5 runded py-4"}
                    handleClick={() => bidAuction(nft.tokenId, bidAmount)}
                  />
                </>
              )}
            </>
          )}
        </div>

        <div className="mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <>
              {nft.auction === "true" ? (
                ""
              ) : (
                <>
                  <p className="font-poppins dark:text-white text-nft-black-1 sm:w-full w-1/2 font-normal text-base border border-gray p-2 mb-4">
                    Set your NFTs fro uction
                  </p>

                  <Button
                    btnName={"Set Auction"}
                    btnType={"primary"}
                    classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded"}
                    handleClick={() => setAuctionModal(true)}
                  />
                </>
              )}
            </>
          ) : currentAccount === nft.owner?.toLowerCase() ? (
            <Button
              btnName={"List on Marketplace"}
              btnType={"primary"}
              classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded-xl"}
              handleClick={() =>
                router.push(
                  `/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                )
              }
            />
          ) : nft.auction === "true" ? (
            ""
          ) : (
            <div className="mt-7 w-full">
              <Button
                btnName={`Buy for ${nft.price} ${nftCurrency}`}
                btnType={"primary"}
                classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded"}
                handleClick={() => setPaymentModal(true)}
              />
              <Button
                btnName={`Buy with  ${nft.netPrice} @TBC coin`}
                btnType={"primary"}
                classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded"}
                handleClick={() => buyNativeToken()}
              />
            </div>
          )}
        </div>
      </div>

      {/* //PAYMENT MODAL */}
      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className="flex flex-row sm:flex-col">
              <Button
                btnName={"Checkout"}
                btnType={"primary"}
                classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded"}
                handleClick={checkout}
              />
              <Button
                btnName={"Cancel"}
                btnType={"outline"}
                classStyle={"rounded"}
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {/* //ISLOADING */}
      {isLoadingNFT && (
        <Modal
          header="Buying NFT..."
          body={
            <div className="flexCenter flex-col text-center">
              <div className="relative w-52 h-52">
                <Loader />
              </div>
            </div>
          }
          handleClose={() => setSuccessModal(false)}
        />
      )}

      {/* //SUCCESSMODAL */}
      {successModal && (
        <Modal
          header={"Payment Successful"}
          body={
            <div
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image
                  src={nft.image || images[`nft${nft.i}`]}
                  objectFit="cover"
                  layout="fill"
                />
              </div>

              <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal mt-10">
                {""}
                Your successfully purchased
                <span className="font-semibold">{nft.name}</span> from{""}{" "}
                <span className="font-semibold">
                  {shortenAddress(nft.seller)}
                </span>
              </p>
            </div>
          }
          footer={
            <div className="check it out">
              <Button
                btnName={"Check it out"}
                btnType={"primary"}
                classStyle={"sm:mr-0 sm:mb-5 rounded"}
                handleClick={() => router.push("/my-account")}
              />
            </div>
          }
          handleClose={() => setSuccessModal(false)}
        />
      )}

      {/* //AUCTIONMODAL */}
      {auctionModal && (
        <Modal
          header={"Auction Your NFT"}
          body={
            <div className="flexCenter flex-col text-center">
              <Input
                inputType={"number"}
                placeholder={"enter your amount"}
                handleClick={(e) => handleFormFieldChange("price", e)}
              />

              <input
                type="date"
                className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-1 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
                onChange={(e) => handleFormFieldChange("endDate", e)}
              />

              <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal mt-10">
                Kindly provide, all details for auction
              </p>
            </div>
          }
          footer={
            <div className="flexCenter flex-col">
              <Button
                btnName={"Set Auction"}
                btnType={"primary"}
                classStyle={"ms:mr-0 sm:mb-5 rounded"}
                handleClick={() => callAuction()}
              />
            </div>
          }
          handleClose={() => setAuctionModal(false)}
        />
      )}
    </div>
  );
};

export default nftDetails;
