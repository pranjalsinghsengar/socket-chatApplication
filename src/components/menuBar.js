import React from "react";
import { IoVideocam } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { toast } from "react-toastify";

const MenuBar = () => {
  const buttons = [
    {
      icon: <MdHistory />,
    },
    {
      icon: <IoVideocam />,
    },
    {
      icon: <RiAddFill />
      , title:"create room"
    },
  ];

  return (
    <div className="border-b border-violet-500 w-1/2  px-2 py-1 flex justify-center gap-3 mb-2">
      {buttons.map((item, index) => (
        <button
          key={index}
          className="text-violet-700 border p-1 px-2 border-violet-500 rounded-lg hover:text-white hover:bg-violet-500 text-2xl flex gap-2items-center"
          onClick={() => toast("menu Button Clicked")}
        >
          {item?.icon}{item?.title &&  <span className="text-sm"> {item?.title}</span>}
        </button>
      ))}
    </div>
  );
};

export default MenuBar;
