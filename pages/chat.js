import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Loader, Input, Button } from "../components/index";
import { NFTContext } from "../context/NFTContext";
import images from "../assets";
import { shortenAddress } from "../utils/shortenAddress";

const chat = () => {
  const {
    communityuserFriendList,
    communityUserMessage,
    communitySendMessage,
    currentAccount,
  } = useContext(NFTContext);

  //STATEVARIABLE
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState([]);

  const [formInput, updateFormInput] = useState({
    name: "",
    address: "",
    message: "",
    currentUser: "",
  });

  const router = useRouter();

  useEffect(() => {
    communityuserFriendList().then((items) => {
      setFriends(items);
    });
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    communityUserMessage(router.query.address, router.query.currentUser).then(
      (items) => {
        setMessage(items);
      }
    );

    updateFormInput(router.query);
    setIsLoading(false);
  }, [router.isReady]);

  const sendMessageFriend = async () => {
    const { message, address } = formInput;
    if (!address || !message) return console.log("Please provide message");

    try {
      await communitySendMessage(address, message);
    } catch (error) {
      console.log(error);
    }
  };

  const reload = () => {
    setTimeout(() => {
      location.reload();
    }, "100");
  };

  // console.log(formInput);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        {!isLoading && !friends.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Sorry you have no friends
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-10 mb-10 sm:w-full flex flex-row sm:flex-col gap-x-10 sm:mb-40">
              {/* //SECTION 1 */}
              <div className="w-80 sm:w-full md:w-64">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0 mb-10">
                  Friends
                </h1>
                {friends.map((el, i) => (
                  <Link
                    href={{
                      pathname: "/chat",
                      query: {
                        name: `${el.name}`,
                        address: `${el.pubkey}`,
                        currentUser: `${currentAccount}`,
                      },
                    }}
                  >
                    <div
                      className="cursor-pointer mt-3 flex gap-4 items-center border p-2 dark:border-nft-black-1 border-nft-gray-1 rounded-md"
                      key={i + 1}
                      onClick={() => reload()}
                    >
                      <Image
                        src={images[`creator${i + 1}`]}
                        width={50}
                        height={50}
                        alt="person"
                        className="rounded-md"
                      />
                      <p>{el.name || shortenAddress(el.address)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* //SECTION 2 */}

              <div className="w-3/4 sm:w-full">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0 mb-10">
                  Recent Chat
                </h1>

                <div className="border dark:border-nft-black-1 border-nft-gray-1 rounded-md h-96 p-2">
                  <div className="cursor-pointer flex gap-4 items-center nft-red-violet">
                    <Image
                      src={images.creator1}
                      width={50}
                      height={50}
                      alt="person"
                      className="rounded-md"
                    />
                    <p>{formInput.name}</p>
                  </div>

                  <div className="mt-8 pl-5 sm:pl-0 h-72 overflow-auto no-scrollbar">
                    {message?.map((message, i) => (
                      <div className="border dark:border-nft-black-1 border-nft-gray-1 rounded-md p-2 mt-2">
                        <div className="chatBoxFlex">
                          <Image
                            src={images[`creator${i + 1}`]}
                            width={30}
                            height={30}
                            className="rounded"
                          />

                          <p>
                            {formInput.address == message.sender
                              ? message.receiver
                              : message.acctiveUser}
                          </p>

                          <p>
                            {new Date(message.timestamp * 1000).toDateString()}
                          </p>
                        </div>
                        <p>{message.msg}</p>
                      </div>
                    ))}
                  </div>

                  {/* //INPUT FIELD */}

                  <div className="-m-10 sm:w-full flex flex-row sm:flex-col gap-x-4">
                    <Input
                      inputType={"input"}
                      placeholder={"message"}
                      handleClick={(e) =>
                        updateFormInput({
                          ...formInput,
                          message: e.target.value,
                        })
                      }
                    />
                    <Button
                      btnName={"Send"}
                      btnType={"primary"}
                      classStyle={"rounded mt-14 sm:mt-2"}
                      handleClick={sendMessageFriend}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default chat;
