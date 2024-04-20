import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Input } from "../components/index";
import { NFTContext } from "../context/NFTContext";

const support = () => {
  const { sendSupportMessage } = useContext(NFTContext);
  const router = useRouter();

  const [formInput, updateFormImput] = useState({
    name: "",
    title: "",
    message: "",
  });

  const messageTransfer = async () => {
    const { name, title, message } = formInput;

    if (!name || !title || !message)
      return console.log("Please provide all data");

    try {
      await sendSupportMessage(name, title, message);
      router.push("my-account");
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Feed Back
        </h1>

        <Input
          inputType={"input"}
          title={"Name"}
          placeholder={"name"}
          handleClick={(e) =>
            updateFormImput({ ...formInput, name: e.target.value })
          }
        />

        <Input
          inputType={"input"}
          title={"Title"}
          placeholder={"your problem"}
          handleClick={(e) =>
            updateFormImput({ ...formInput, title: e.target.value })
          }
        />

        <Input
          inputType={"textarea"}
          title={`Message`}
          placeholder={"message"}
          handleClick={(e) =>
            updateFormImput({ ...formInput, message: e.target.value })
          }
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Send Message"}
            btnType={"primary"}
            classStyle={"rounded"}
            handleClick={messageTransfer}
          />
        </div>
      </div>
    </div>
  );
};

export default support;
