import React, { useState, useContext } from "react";

//INTERNAL IMPORT
import { Button, Input } from "../../components/index";
import { NFTContext } from "../../context/NFTContext";
import { shortenAddress } from "../../utils/shortenAddress";

const AdminToken = () => {
  const { nativeToken, tokenSale, transferNativeToken } =
    useContext(NFTContext);

  const [form, setForm] = useState({
    amount: "",
    address: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const callFunction = async () => {
    await transferNativeToken(form);
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <div className="mt-7 w-full flex flex-wrap justify-start md:justify-center gap-x-5">
          <Button
            btnName={nativeToken?.tokenName}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />
          <Button
            btnName={nativeToken?.tokenSymbol}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />
          <Button
            btnName={nativeToken?.tokenTotalSupply}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />
          <Button
            btnName={nativeToken?.tokenHolders}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />
          <Button
            btnName={`Your Bal: ${nativeToken?.tokenBalance} ${nativeToken?.tokenSymbol}`}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />
          <Button
            btnName={shortenAddress(nativeToken?.tokenAddress)}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />

          <Button
            btnName={`Token Price: ${tokenSale?.tokenPrice} ETH`}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />

          <Button
            btnName={`Token Sold: ${tokenSale?.tokenSold} ${nativeToken?.tokenSymbol}`}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />

          <Button
            btnName={`Token For Sale: ${tokenSale?.tokenSaleBalance} ${nativeToken?.tokenSymbol}`}
            btnType={"primary"}
            classStyle={"rounded mt-4 sm:mt-4"}
          />
        </div>

        <Input
          inputType={"number"}
          title={"Token"}
          placeholder={"Quantity"}
          cryptoToken={nativeToken?.tokenSymbol}
          handleClick={(e) => handleFormFieldChange("amount", e)}
        />

        <Input
          inputType={"input"}
          title={"address"}
          placeholder={"address"}
          cryptoToken={nativeToken?.tokenSymbol}
          handleClick={(e) => handleFormFieldChange("address", e)}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Transfer Token"}
            btnType={"primary"}
            classStyle={"rounded"}
            handleClick={() => callFunction()}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminToken;
