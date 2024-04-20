import { ethers } from "ethers";
import axios from "axios";

import { COMMUNITY_ADDRESS, COMMUNITY_ABI } from "../context/constants";
import {
  getBalance,
  checkIfWalletConnected_NEW,
  CALLING_CONTRACT,
} from "./contract";

//GET ALL USERS
export const communityAllUser = async () => {
  const COMMUNITY_CONTRACT = await CALLING_CONTRACT(
    COMMUNITY_ADDRESS,
    COMMUNITY_ABI
  );

  const account = await checkIfWalletConnected_NEW();
  if (account) {
    const allCommunityUsers = await COMMUNITY_CONTRACT.getAllAppUser();

    const userLists =
      account &&
      (await Promise.all(
        allCommunityUsers.map(async ({ accountAddress, name }) => {
          return {
            accountAddress,
            name,
          };
        })
      ));

    return userLists;
  } else {
    return [];
  }
};

//USER FRIEND LIST
export const communityuserFriendList = async () => {
  try {
    const COMMUNITY_CONTRACT = await CALLING_CONTRACT(
      COMMUNITY_ADDRESS,
      COMMUNITY_ABI
    );

    const data = await COMMUNITY_CONTRACT.getMyFriendList();

    const items = await Promise.all(
      data.map(async ({ pubkey, name }) => {
        return {
          pubkey,
          name,
        };
      })
    );

    return items;
  } catch (error) {
    console.log(error);
  }
};

//USER MESSAGE
export const communityUserMessage = async (address, currentUser) => {
  try {
    const COMMUNITY_CONTRACT = await CALLING_CONTRACT(
      COMMUNITY_ADDRESS,
      COMMUNITY_ABI
    );

    const getUserMessage = await COMMUNITY_CONTRACT.readMessage(address);
    const activeUser = await COMMUNITY_CONTRACT.getUsername(currentUser);
    const receiver = await COMMUNITY_CONTRACT.getUsername(address);

    const message = await Promise.all(
      getUserMessage.map(async ({ msg, sender, timestamp }) => {
        return {
          msg,
          sender,
          timestamp: timestamp.toNumber(),
          receiver,
          activeUser,
        };
      })
    );

    return message;
  } catch (error) {
    console.log(error);
  }
};
