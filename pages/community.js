import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// IMTERNAL IMPORT
import {
  CreatorCard,
  Loader,
  Input,
  SearchBar,
  Banner,
  AddFriend,
  Button,
} from "../components";
import { NFTContext } from "../context/NFTContext";
import images from "../assets";
import { shortenAddress } from "../utils/shortenAddress";

///AddFriendMODAL
const AddFriendModal = ({ userName, address, index }) => (
  <div className="flex flex-col">
    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image
            src={images[`creator${index + 1}`]}
            layout="fill"
            objectFit="cover"
            alt="creator"
            className="rounded"
          />
        </div>

        <div className="ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {shortenAddress(address)}
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1  text-sm minlg:text-xl">
            {userName}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const community = () => {
  const {
    communityAddFriend,
    communityAllUser,
    currentAccount,
    communityCreateAccount,
    address,
  } = useContext(NFTContext);
  const [user, setUsers] = useState([]);
  const [userCopy, setUserCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState("Recently Added");
  const [addFriend, setAddFriend] = useState(false);
  const [accountBox, setAccountBox] = useState(false);
  const [name, setName] = useState("");

  const [formInput, updateFormInput] = useState({
    userName: "",
    address: "",
    index: "",
  });

  const router = useRouter();

  useEffect(() => {
    communityAllUser(address).then((items) => {
      const newList = items?.filter(function (obj) {
        return (
          obj.accountAddress !== "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        );
      });

      setUsers(newList.reverse());
      setUserCopy(newList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const sortedNfts = [...user];

    switch (activeSelect) {
      case "Price (low to high)":
        setUsers(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "Price (high to low)":
        setUsers(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "Recently added":
        setUsers(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setUsers(user);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    const filteredNfts = user.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setUsers(userCopy);
    } else {
      setUsers(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (user.length && userCopy.length) {
      setUsers(userCopy);
    }
  };

  const createAccount = async () => {
    if (!name) return console.log("Please Provide Name");
    try {
      await communityCreateAccount(name);
      router.push("/my-account");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const makeNewFriend = async () => {
    const { userName, address } = formInput;
    if (!userName || !address) return console.log("Please Provide Name");
    try {
      await communityAddFriend(address, userName);
      router.push("/my-account");
    } catch (error) {
      console.log("Error uploading adding friend: ", error);
    }
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={
            <>
              Welcome to CryptoKing <br /> Community!
            </>
          }
          childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
          parentStyle={
            "justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-xl"
          }
        />

        {isLoading && !userCopy.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Sorry, No Community member!
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                  <Button
                    btnName={"Create Account"}
                    classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded"}
                    handleClick={() => setAccountBox(true)}
                  />
                </h1>

                <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>

              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {user.map((user, i) => (
                  <div
                    className={`min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4 cursor-pointer`}
                    onClick={() => (
                      updateFormInput({
                        ...formInput,
                        userName: user.name,
                        address: user.accountAddress,
                        index: i,
                      }),
                      setAddFriend(true)
                    )}
                  >
                    <div className="w-8 h-8 minlg:w-10 minlg:h-10 rounded-full bg-nft-red-violet flexCenter">
                      <p className="font-poppins text-white font-semibold text-base minlg:text-lg">
                        {i + 1}
                      </p>
                    </div>

                    <div className="my-2 flex justify-center">
                      <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
                        <Image
                          src={images[`creator${i + 1}`]}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />

                        <div className="absolute w-4 h-4 minlg:w-7 bottom-2 -right-0">
                          <Image
                            src={images.tick}
                            layout="fill"
                            objectFit="conatin"
                            alt="tick"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
                        {shortenAddress(user.accountAddress)}
                      </p>
                      <p className=" mt-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
                        {user.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* //ADD FRIEND */}
        {addFriend && (
          <AddFriend
            header="Connect"
            body={
              <AddFriendModal
                address={formInput.address}
                userName={formInput.userName}
                index={formInput.index}
              />
            }
            footer={
              <div className="flex flex-row sm:flex-col">
                <Button
                  btnName={"Add Friend"}
                  btnType={"primary"}
                  classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded"}
                  handleClick={makeNewFriend}
                />
                <Button
                  btnName={"Cancle"}
                  btnType={"outline"}
                  classStyle={" rounded"}
                  handleClick={() => setAddFriend(false)}
                />
              </div>
            }
            handleClose={() => setAddFriend(false)}
          />
        )}

        {/* //ADD FRIEND */}
        {accountBox && (
          <AddFriend
            header="Join Community"
            body={
              <div className="flex flex-col ">
                <div className="flexBetweenStart my-5">
                  <div
                    className="flex-1
                  flexStartCenter"
                  >
                    <div className="relative w-full h-28">
                      <Input
                        inputType={"input"}
                        title={"Name"}
                        placeholder={"name"}
                        handleClick={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
            footer={
              <div className="flex flex-row sm:flex-col">
                <Button
                  btnName={"Create Account"}
                  btnType={"primary"}
                  classStyle={"mr-5 sm:mr-0 sm:mb-5 rounded"}
                  handleClick={createAccount}
                />
                <Button
                  btnName={"Cancle"}
                  btnType={"outline"}
                  classStyle={" rounded"}
                  handleClick={() => setAccountBox(false)}
                />
              </div>
            }
            handleClose={() => setAccountBox(false)}
          />
        )}
      </div>
    </div>
  );
};

export default community;
