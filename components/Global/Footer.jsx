import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useForm } from "@formspree/react";
import toast from "react-hot-toast";
import Image from "next/image";

//INTERNAL IMPORT
import images from "../../assets";

//FOOTER MENU GENERATOR
const FooterLinks = ({ heading, items, extraClasses, links }) => (
  <div className={`flex-1 justify-start items-start ${extraClasses}`}>
    <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">
      {heading}
    </h3>
    {items.map((item, index) => (
      <Link href={`${item.link}`}>
        <p
          key={item + index}
          className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3"
        >
          {item.name}
        </p>
      </Link>
    ))}
  </div>
);

const Footer = () => {
  const { theme } = useTheme();
  const notifySuccess = (msg) => toast.error(msg, { duration: 2000 });

  const [state, handleSubmit] = useForm("xleybvnv");

  if (state.succeeded) {
    return notifySuccess("Thanks for joining");
  }

  const items = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Audio",
      link: "/nfts/audio",
    },
    {
      name: "Video",
      link: "/nfts/video",
    },
    {
      name: "Image",
      link: "/nfts/image",
    },
    {
      name: "Creator",
      link: "/creator",
    },
    {
      name: "Charity",
      link: "/charity",
    },
    {
      name: "Created NFTs",
      link: "/created-nfts",
    },
  ];

  const services = [
    {
      name: "Offer",
      link: "/offers",
    },
    {
      name: "Community",
      link: "/community",
    },
    {
      name: "Support",
      link: "/support",
    },
    {
      name: "Transfer",
      link: "/transferFunds",
    },
    {
      name: "ICO Token",
      link: "/token-sale",
    },
    {
      name: "NFT Auction",
      link: "/nft-auction",
    },
  ];

  const support = [
    {
      name: "Help Center",
      link: "/faq",
    },
    {
      name: "My Account",
      link: "/my-account",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
  ];
  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.bluelogo}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-dark font-semibold text-lg ml-1">
              CryptoKing
            </p>
          </div>
          <p className="font-popins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
            {" "}
            Get the latest updates
          </p>

          <div className="md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-3 rounded-md">
            <form className="flexBetween" onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
              />
              <div className="flex-initial">
                <button
                  className="nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:py-4 rounded-md minlg:px-8 font-poppins font-semibold text-white"
                  type="submit"
                  disabled={state.submitting}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks heading="CryptoKing" items={items} />
          <FooterLinks heading="Service" items={services} extraClasses="ml-4" />
          <FooterLinks heading="Support" items={support} extraClasses="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
