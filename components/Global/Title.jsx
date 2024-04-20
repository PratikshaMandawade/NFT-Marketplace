import React from "react";

const Title = ({ title, styleClass }) => {
  return (
    <div
      className={`${styleClass} flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start`}
    >
      <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
        Top {title} NFTs
      </h1>
    </div>
  );
};

export default Title;
