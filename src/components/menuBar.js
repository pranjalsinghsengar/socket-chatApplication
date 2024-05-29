import React from "react";
import { IoVideocam } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { toast } from "react-toastify";

const MenuBar = ({ setOpenFriendList, CreateRoomHandler, setRoomName ,setJoinRoom,JoinRoomHandler}) => {
  const buttons = [
    {
      title: "Users List",
    },
    {
      icon: <MdHistory />,
    },
    {
      icon: <IoVideocam />,
    },
    {
      icon: <RiAddFill />,
      title: "create room",
    },
    {
      // icon: <RiAddFill />,
      title: "join room",
    },
  ];

  const ButtonHandler = (item) => {
    if (item.title === "Users List") setOpenFriendList(true);
  };

  return (
    <div className="border-b border-violet-500 w-1/2  px-2 py-1 flex justify-center gap-3 mb-2">
      <div className="gap-3 flex">
      
        <form onSubmit={CreateRoomHandler}>
          <input
            placeholder="Create Room name"
            
            className="outline-none border-2 border-red-600 rounded-md p-2 py-1"
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button type="submit"></button>
        </form>
        <form onSubmit={JoinRoomHandler}>
          <input
            placeholder="Join Room "
            
            className="outline-none border-2 border-green-600 rounded-md p-2 py-1"
            onChange={(e) => setJoinRoom(e.target.value)}
          />
          <button type="submit"></button>
        </form>
      </div>

      {buttons.map((item, index) => (
        <button
          key={index}
          className="text-violet-700 border p-1 px-2 border-violet-500 rounded-lg hover:text-white hover:bg-violet-500 text-2xl flex gap-2items-center"
          onClick={() => ButtonHandler(item)}
        >
          {item?.icon}
          {item?.title && <span className="text-sm"> {item?.title}</span>}
        </button>
      ))}
    </div>
  );
};

export default MenuBar;
