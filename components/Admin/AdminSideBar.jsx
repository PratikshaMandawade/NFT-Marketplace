import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import assets from "../../assets";
import {
  Dashboard,
  Document,
  Setting,
  Message,
  Folder,
  Student,
} from "../../components/index";

const AdminSideBar = ({ activeMenu, setActiveMenu }) => {
  const sideBarMenu = [
    {
      name: "Dashbord",
      icon: <Dashboard />,
    },
    {
      name: "NFTs",
      icon: <Document />,
    },
    {
      name: "Community",
      icon: <Student />,
    },
    {
      name: "Charity",
      icon: <Message />,
    },
    {
      name: "Creator",
      icon: <Student />,
    },
    {
      name: "Token",
      icon: <Setting />,
    },
    {
      name: "Auction",
      icon: <Dashboard />,
    },
    {
      name: "Transfer",
      icon: <Student />,
    },
    {
      name: "Feedback",
      icon: <Folder />,
    },
    {
      name: "Function",
      icon: <Dashboard />,
    },
  ];

  return (
    <aside className="sm:hidden flex flex-col dark:bg-[#1a1a1a]">
      <a className="inline-flex items-center justify-center h-20 w-full dark:bg-[#1a1a1a] hover:bg-[#705df2] focus:bg-[#705df2]">
        <Image src={assets.bluelogo} width={40} height={40} />
        <span className="dark:text-white text-4xl ml-2" x-show="menu">
          CK
        </span>
      </a>

      <div className="flex-grow flex flex-col justify-between text-gray-500 dark:bg-[#1a1a1a]">
        <nav className="flex flex-col mx-4 my-6 space-y-4">
          {sideBarMenu.map((menu, i) => (
            <a
              onClick={() => setActiveMenu(menu.name)}
              key={i + 1}
              className={`${
                activeMenu == menu.name && "dark:text-[#fff] text-[#705df2]"
              } inline-flex items-center py-3 dark:bg-[#222222] rounded-lg px-2 cursor-pointer`}
            >
              {menu.icon}
              <span className="ml-2" x-show="menu">
                {menu.name}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSideBar;
