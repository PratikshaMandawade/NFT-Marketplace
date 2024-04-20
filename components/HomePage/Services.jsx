import React from "react";
import Image from "next/image";
import Link from "next/link";

const Services = ({ serviceList }) => {
  return (
    <Link href={serviceList.link}>
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={serviceList.image}
            layout="fill"
            objectFit="cover"
            alt={serviceList.offer}
          />
        </div>

        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl text-center pb-0 z-30">
            {serviceList.offer}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Services;
