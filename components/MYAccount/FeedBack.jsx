import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";

///INTERNAL IMPORT
import { NFTContext } from "../../context/NFTContext";
import { Loader } from "../../components/index";
import images from "../../assets";
import { shortenAddress } from "../../utils/shortenAddress";

const FeedBack = () => {
  const { getUserMessageHistory } = useContext(NFTContext);
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserMessageHistory().then((item) => {
      setMessage(item);
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

  console.log(message);

  return (
    <>
      {!isLoading && message?.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            Sorry you have no message
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="mt-3 w-full accountAudio">
            {message?.map((message, i) => (
              <div
                key={i + 1}
                className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:mx-2 cursor-pointer shadow-md"
              >
                <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
                  <Image
                    src={images.creator}
                    layout="fill"
                    objectFit="cover"
                    alt="creator"
                  />
                </div>

                <div className="mt-3 flex flex-col">
                  <p className="font-poppins mb-3 dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
                    {message.name}
                  </p>

                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
                    {message.title}
                  </p>

                  <div className="flexBetween mt-3 minlg:mt-3 flex-row  xs:items-start xs:mt-3">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
                      {message.message}
                    </p>
                  </div>

                  <div className="mt-1 minlg:mt-3 flexBetween flex-row"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedBack;
