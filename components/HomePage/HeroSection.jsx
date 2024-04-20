import React from "react";
import { useForm } from "@formspree/react";
import toast from "react-hot-toast";

const HeroSection = () => {
  const notifySuccess = (msg) => toast.error(msg, { duration: 2000 });
  const [state, handleSubmit] = useForm("xleybvnv");

  if (state.succeeded) {
    return notifySuccess("Thanks for joining");
  }

  return (
    <section className="rounded-xl p-6 bg-[#705dfc] text-[#ffff]">
      <div className="container grid gap-6 mx-auto text-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-5">
        <div className="w-full heroSection-padding px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-gray-900">
          <span className="block mb-2 text-[#fff]">
            Welcome to world of NFTs
          </span>

          <h1 className="text-5xl sm:text-3xl font-extrabold dark:text-gray-50">
            CryptoKing Offers
          </h1>

          <p className="my-8">
            <span className="font-medium dark:text-gray-50">Offers by, </span>
            CryptoKing is the world's first and largest web3 marektplace for
            NFTs and crypto collectibles
          </p>

          <form onSubmit={handleSubmit} className="self-stretch space-y-3">
            <div>
              <label for="name" className="text-sm sr-only">
                Your name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                placeholder="Your name"
                className="w-full rounded-md focus:ring focus:ri dark:border-[#705df2] p-4"
              />
            </div>

            <div>
              <label for="email" className="text-sm sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                className="w-full rounded-md focus:ring focus:ri dark:border-[#705df2] p-4"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-2 font-semibold rounded bg-[#705df2] text-[#fff]"
            >
              Submit
            </button>
          </form>
        </div>

        <img
          src="https://source.unsplash.com/random/480x360"
          alt="image"
          className="object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500"
        />
      </div>
    </section>
  );
};

export default HeroSection;
