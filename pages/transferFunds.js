import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Input } from "../components/index";
import { NFTContext } from "../context/NFTContext";

const transferFunds = () => {
  const { transferFunds } = useContext(NFTContext);
  const router = useRouter();

  const [count, setCount] = useState("");
  const [formInput, updateFormImput] = useState({
    amount: "",
    name: "",
    description: "",
    recipient: "",
  });

  const createTransferfund = async () => {
    const { amount, name, description, recipient } = formInput;

    if (!amount || !name || !description || !recipient)
      return console.log("Please provide all data");

    try {
      await transferFunds(amount, name, description, recipient);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Transfer Funds
        </h1>

        <Input
          inputType={"number"}
          title={"Amount"}
          placeholder={"amount"}
          handleClick={(e) =>
            updateFormImput({ ...formInput, amount: e.target.value })
          }
        />

        <Input
          inputType={"input"}
          title={"Address"}
          placeholder={"address"}
          handleClick={(e) =>
            updateFormImput({ ...formInput, recipient: e.target.value })
          }
        />

        <Input
          inputType={"input"}
          title={"Name"}
          placeholder={"name"}
          handleClick={(e) =>
            updateFormImput({ ...formInput, name: e.target.value })
          }
        />

        <Input
          inputType={"textarea"}
          title={`Description ${count}`}
          placeholder={"name"}
          handleClick={(e) => (
            setCount(e.target.value.length),
            updateFormImput({ ...formInput, description: e.target.value })
          )}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Transfer Funds"}
            btnType={"primary"}
            classStyle={"rounded"}
            handleClick={createTransferfund}
          />
        </div>
      </div>
    </div>
  );
};

export default transferFunds;
