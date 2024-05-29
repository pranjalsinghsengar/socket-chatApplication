import React from "react";
import { IoVideocam } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { bgGradient, darkBlack } from "../styles/globalStyle";

const MenuBar = ({ setOpenMenuItem, OpenMenuItem }) => {
  const buttons = [
    {
      name: "userList",
      title: "Users List",
    },
    {
      name: "history",

      icon: <MdHistory />,
    },
    {
      name: "meeting",

      icon: <IoVideocam />,
    },
    {
      name: "createRoom",

      icon: <RiAddFill />,
      title: "create room",
    },
    {
      name: "joinRoom",
      // icon: <RiAddFill />,
      title: "join room",
    },
  ];

  const ButtonHandler = (item) => {
    setOpenMenuItem(item.name);
  };

  return (
    <div className='border-b border-violet-500 w-1/2  px-2 py-1 flex justify-center gap-3 mb-2'>
      {buttons.map((item, index) => (
        <button
          key={index}
          className={`text-violet-700 border p-1 px-2 border-violet-500 rounded-lg hover:text-white hover:bg-violet-500 text-2xl flex gap-2items-center
            ${OpenMenuItem === item?.name ? bgGradient : ""}
          `}
          onClick={() => ButtonHandler(item)}
        >
          {item?.icon}
          {item?.title && <span className='text-sm'> {item?.title}</span>}
        </button>
      ))}
    </div>
  );
};

export default MenuBar;
