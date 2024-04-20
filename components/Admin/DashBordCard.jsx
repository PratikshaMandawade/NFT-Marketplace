import React from "react";

const DashBordCard = ({ icon, title, number }) => {
  return (
    <div className="flex items-center p-8 dark:bg-[#2d2e35] shadow rounded-lg">
      <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 dark:text-[#fff] bg-[#705df2] rounded-full mr-6">
        {icon}
      </div>
      <div>
        <span className="block text-2xl text-[#2d2e35] dark:text-[#fff] font-bold">
          {number}
        </span>
        <span className="block  text-[#2d2e35] dark:text-[#fff] ">{title}</span>
      </div>
    </div>
  );
};

export default DashBordCard;
