import { ethers } from "ethers";
import axios from "axios";

import { TRANSFER_FUND_ABI, TRANSFER_FUND_ADDRESS } from "../context/constants";
import {
  getBalance,
  checkIfWalletConnected_NEW,
  CALLING_CONTRACT,
} from "./contract";

export const loadTransferHistory = async () => {
  try {
    const TRANSFER_FUND_CONTRACT = await CALLING_CONTRACT(
      TRANSFER_FUND_ADDRESS,
      TRANSFER_FUND_ABI
    );

    const transferHistory = await TRANSFER_FUND_CONTRACT.getTransferHistory();

    const transferHistoryInfo = await Promise.all(
      transferHistory.map(
        async ({ recipient, name, description, amount, to, from }) => {
          const amountTransfer = ethers.utils.formatUnits(
            amount.toString(),
            "ether"
          );

          return {
            recipient,
            name,
            description,
            amountTransfer,
            to,
            from,
          };
        }
      )
    );
    return transferHistoryInfo;
  } catch (error) {
    console.log(error);
  }
};

//GET USER TRANSFER
export const getUserTransferFundHistory = async () => {
  const TRANSFER_FUND_CONTRACT = await CALLING_CONTRACT(
    TRANSFER_FUND_ADDRESS,
    TRANSFER_FUND_ABI
  );

  const account = await checkIfWalletConnected_NEW();

  if (account) {
    const transferHistory =
      await TRANSFER_FUND_CONTRACT.getUserTransferHistory();

    const transferData = await Promise.all(
      transferHistory.map(
        async ({ recipient, name, description, amount, to, from }) => {
          const amountTransfer = ethers.utils.formatUnits(
            amount.toString(),
            "ether"
          );

          return {
            recipient,
            name,
            description,
            amountTransfer,
            to,
            from,
          };
        }
      )
    );
    return transferData;
  } else {
    return [];
  }
};
