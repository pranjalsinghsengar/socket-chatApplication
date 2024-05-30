import React from "react";
import { bgGradient, darkBlack, shadeBlack } from "../styles/globalStyle";

const FriendsList = ({ setOpenMenuItem, users, startConversation }) => {
  return (
    <div className='p-3 relative max-h-52 w-11/12 md:w-9/12 mb-2 rounded-lg bg-zinc-950/30 pr-8 overflow-y-auto shadow-lg shadow-zinc-800 backdrop-blur-md '>
      <button
        className=' text-xs md:text-base  border border-violet-600 rounded-md text-white p-1 px-2 cursor-pointer absolute right-0 top-0'
        onClick={() => setOpenMenuItem("")}
      >
        X
      </button>
      <h1  className='mb-4 font-semibold text-sm md:text-lg'>Select user for Chat</h1>
      <div className='flex flex-wrap gap-1.5 md:gap-2 lg:gap-3 z-10 md:text-sm lg:text-base text-xs'>
        {users.length > 0
          ? users.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`px-5 py-2 lg:rounded-2xl md:rounded-lg rounded-md bg-zinc-900 `}
                  onClick={() => startConversation(item)}
                >
                  {item?.name}
                </button>
              );
            })
          : "NO USERS"}
      </div>
    </div>
  );
};

export default FriendsList;
