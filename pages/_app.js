import React, { useState } from "react";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import toast, { Toaster } from "react-hot-toast";

//INTERNAL IMPORT
import "../styles/globals.css";
import { Navbar, Footer, Donate, DonateModal } from "../components/index";
import { NFTProvider } from "../context/NFTContext";

const Marketplace = ({ Component, pageProps }) => {
  const [openDonation, setOpenDonation] = useState(false);
  return (
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />

          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
          <Donate setOpenDonation={setOpenDonation} />
          <Toaster />

          {openDonation && <DonateModal setOpenDonation={setOpenDonation} />}
        </div>

        <Script src="https://kit.fontawesome.com/d45b25ceeb.js" />
      </ThemeProvider>
    </NFTProvider>
  );
};

export default Marketplace;
