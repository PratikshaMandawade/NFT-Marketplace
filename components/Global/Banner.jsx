import React from "react";

const Banner = ({ name, childStyles, parentStyle }) => {
  return (
    <div
      className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyle}`}
    >
      <p
        className={`font-bold text-5xl text-white font-poppins leading-70 ${childStyles}`}
      >
        {name}
      </p>
    </div>
  );
};

export default Banner;
