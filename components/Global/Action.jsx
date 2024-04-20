import React from "react";

//INTERNAL IMPORT
import { Google, Apple } from "../index";

const Action = () => {
  return (
    <section className="rounded-xl mt-12 mb-12 py-6 bg-[#705df2] dark:text-gray-50">
      <div className="container mx-auto flex sm:flex-col md:flex-col flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
        <div className="flex flex-col justify-center lg:text-left">
          <p className="mb-1 text-sm font-medium tracki uppercase text-[#fff]">
            Lorem ipsum, dolor sit amet consectetur
          </p>
          <h1 className="py-2 text-3xl font-medium leadti title-font text-[#fff]">
            CryptoKing Marketplace
          </h1>
        </div>

        <div className="flex md:flex-col flex-col items-center justify-start flex-shrink-0 mt-6 space-y-4 sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end sm:grid sm:gap-2">
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-[#1a1a1a] text-[#fff]">
            <Google />
            <span className="flex flex-col items-start ml-4 leadi">
              <span className="mb-1 text-xs">GET IT ON</span>
              <span className="font-semibold title-font">Google Play</span>
            </span>
          </button>

          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-[#1a1a1a] text-[#fff]">
            <Apple />
            <span className="flex flex-col items-start ml-4 leadi">
              <span className="mb-1 text-xs">Download on the</span>
              <span className="font-semibold title-font">Apple Store </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Action;
