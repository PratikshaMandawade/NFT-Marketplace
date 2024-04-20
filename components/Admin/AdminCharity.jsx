import React from "react";

//internal IMPORT
import { shortenAddress } from "../../utils/shortenAddress";

const AdminCharity = ({ allDonorList }) => {
  return (
    <>
      <div className="container p-2 mx-auto sm:p-4 text-[#222222] dark:text-[#fff]">
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <colgroup>
              <col className="w-5" />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-5" />
            </colgroup>
            <thead>
              <tr className="bg-[#705df2] text-[#fff]">
                <th className="p-3">A-Z</th>
                <th className="p-3">#ID</th>
                <th className="p-3">Creator</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">Member</th>
              </tr>
            </thead>

            {allDonorList
              .map((donor, i) => (
                <tbody
                  key={i + 1}
                  className="border-b dark:bg-[#1a1a1a] dark:border-gray-700"
                >
                  <tr>
                    <td className="px-3 py-2 text-2xl font-medium dark:text-gray-400">
                      <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img
                          src={`assets/creator${i + 1}.png`}
                          width={50}
                          height={50}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <p>#{i + 1}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{shortenAddress(donor.donor)}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{donor.value} ETH</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>Donation</p>
                    </td>
                    <td className="px-3 py-2">
                      <p>{donor.timestamp} </p>
                    </td>
                    <td className="px-3 py-2">
                      <p>Yes </p>
                    </td>
                  </tr>
                </tbody>
              ))
              .slice(0, 10)}
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminCharity;
