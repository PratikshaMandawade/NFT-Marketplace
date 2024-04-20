import React from "react";

const OnlyAdmin = () => {
  return (
    <section className="dark:bg-[#1a1a1a] dark:text-gray-100 w-full">
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leadi sm:text-3xl">
          Only admin have access
          <span className="dark:text-[#705df2]">, give your feedback</span>,
          CryptoKing
        </h1>

        <p className="px-8 mt-8 mb-12 text-lg">
          Offers by, CryptoKing is the world's first and largest web3
          marketplace for NFTs and crypto collectibles
        </p>

        <div className="flex flex-wrap justify-center">
          <a
            href="/create-nft"
            className="px-8 py-3 m-2 text-lg font-semibold rounded bg-[#705df2] text-[#fff]"
          >
            Get Started
          </a>
          <a
            href="/"
            className="px-8 py-3 m-2 text-lg font-semibold rounded bg-[#705df2] text-[#fff]"
          >
            Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default OnlyAdmin;
