import React from "react";

const Dot = ({ callFunction }) => {
  return (
    <svg
      onClick={() => callFunction(true)}
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
    >
      <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
    </svg>
  );
};

export default Dot;
