import React, { useState } from "react";

//INTERNAL IMPORT
import { Banner, Action, Input, Button } from "../components/index";

const contactUs = () => {
  const [count, setCount] = useState("");
  const [formInput, updateFormImput] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  return (
    <div>
      <Banner
        name={
          <>
            For any help please <br /> contact us
          </>
        }
        childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
        parentStyle={
          "justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded"
        }
      />

      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-3/5 md:w-full">
          <Input
            inputType={"text"}
            title={"name"}
            placeholder={"name"}
            handleClick={(e) =>
              updateFormImput({ ...formInput, name: e.target.value })
            }
          />

          <Input
            inputType={"text"}
            title={"email"}
            placeholder={"email"}
            handleClick={(e) =>
              updateFormImput({ ...formInput, email: e.target.value })
            }
          />

          <Input
            inputType={"text"}
            title={"number"}
            placeholder={"number"}
            handleClick={(e) =>
              updateFormImput({ ...formInput, phone: e.target.value })
            }
          />

          <Input
            inputType={"textarea"}
            title={`Message ${count}`}
            placeholder={"name"}
            handleClick={(e) => (
              setCount(e.target.value.length),
              updateFormImput({ ...formInput, message: e.target.value })
            )}
          />

          <div className="mt-7 w-full flex justify-end">
            <Button
              btnName={"Send"}
              btnType={"primary"}
              classStyle={"rounded"}
              handleClick={{}}
            />
          </div>
          <Action />
        </div>
      </div>
    </div>
  );
};

export default contactUs;
