import React from "react";

const Donate = ({ setOpenDonation }) => {
  return (
    <div className="fixed bottom-0 w-full isolate flex items-center gap-x-6 overflow-hidden bg-[#705df2] px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-[#fff]">
          <strong className="font-semibold">CryptoKing 2023</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx="1" cy={"1"} r={"1"} />
          </svg>
          Kindly support the CryptoKing its a public funding platform
        </p>
        <a
          onClick={() => setOpenDonation(true)}
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:visible:outline focus-visible:outline-2 focus-visible:outline-2 focus-visible:outline-gray-900"
        >
          Support Creator <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default Donate;
