import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import images from "../../assets";
import { shortenAddress } from "../../utils/shortenAddress";
import { Title } from "../../components/index";
import { NFTContext } from "../../context/NFTContext";

const AdminTransfer = ({}) => {
  const { nftCurrency, loadTransferHistory } = useContext(NFTContext);

  const [allTransferHistory, setAllTransferHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransferHistory().then((items) => {
      setAllTransferHistory(items);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {allTransferHistory?.length === 0 ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            No Transfer History
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <Title title={"All user transfer history"} />
          <div className="mt-3 w-full  accountAudio">
            {allTransferHistory.map((transfer, i) => (
              <div
                key={i + 1}
                className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:mx-2 cursor-pointer shadow-md"
              >
                <div className="w-8 h-8 minlg:w-10 minlg:h-10 rounded-full bg-nft-red-violet flexCenter">
                  <p className="font-poppins text-white font-semibold text-base minlg:text-lg">
                    {i + 1}
                  </p>
                </div>

                <div className="my-2 flex justify-center">
                  <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
                    <Image
                      src={images.creator}
                      layout="fill"
                      objectFit="cover"
                      alt="creator"
                      className="rounded-full"
                    />

                    <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
                      <Image
                        src={images.tick}
                        layout="fill"
                        objectFit="cover"
                        alt="tick"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-col">
                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
                    {transfer.name}
                  </p>

                  <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
                      {transfer.amountTransfer}{" "}
                      <span className="font-normal">{nftCurrency}</span>
                    </p>

                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
                      {shortenAddress(transfer.to)}
                    </p>
                  </div>

                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
                    {transfer.description}
                  </p>

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

export default AdminTransfer;
