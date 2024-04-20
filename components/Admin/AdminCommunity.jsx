import React from "react";

//INTERNAL IMPORT
import { CreatorCard, Title } from "../index";
import { shortenAddress } from "../../utils/shortenAddress";
import images from "../../assets";

const AdminCommunity = ({ creators }) => {
  console.log(creators);
  return (
    <div>
      <Title title={"Best Creators"} styleClass={"mt-24 mb-12"} />
      <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
        {creators.map((creator, i) => (
          <CreatorCard
            key={creator.accountAddress}
            rank={i + 1}
            creatorImage={images[`creator${i + 1}`]}
            creatorName={shortenAddress(creator.accountAddress)}
            userName={creator.name}
            link="/community"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCommunity;
