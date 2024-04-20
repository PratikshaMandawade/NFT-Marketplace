import { ethers } from "ethers";
import axios from "axios";

import { SUPPORT_ADDRESS, SUPPORT_ABI } from "../context/constants";
import {
  getBalance,
  checkIfWalletConnected_NEW,
  CALLING_CONTRACT,
} from "./contract";

//SUPPORT MESSAGE CONTRACT
export const loadSupportData = async () => {
  try {
    const SUPPORT_CONTRACT = await CALLING_CONTRACT(
      SUPPORT_ADDRESS,
      SUPPORT_ABI
    );

    const allSupportMessage = await SUPPORT_CONTRACT.getMessageHistory();

    const allMessageHistory = await Promise.all(
      allSupportMessage.map(
        async ({ from, timestamp, name, message, title }) => {
          return {
            from,
            timestamp,
            name,
            message,
            title,
          };
        }
      )
    );
    return allMessageHistory;
  } catch (error) {
    console.log(error);
  }
};
//USER MESSAGE HISTORY
export const getUserMessageHistory = async () => {
  try {
    const SUPPORT_CONTRACT = await CALLING_CONTRACT(
      SUPPORT_ADDRESS,
      SUPPORT_ABI
    );

    const userHistory = await SUPPORT_CONTRACT.getUserMessageHistory();

    const userMessageHistory = await Promise.all(
      userHistory.map(async ({ from, timestamp, name, message, title }) => {
        return {
          from,
          timestamp,
          name,
          message,
          title,
        };
      })
    );
    return userMessageHistory;
  } catch (error) {
    console.log(error);
  }
};
