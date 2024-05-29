import React from "react";
import { bgGradient } from "../styles/globalStyle";

const FriendsList = ({ setOpenMenuItem, users, startConversation }) => {
  return (
    <div className='p-3 relative max-h-52 min-h-32 w-9/12 mb-2 rounded-lg bg-zinc-900/65 pr-8 overflow-y-auto '>
      <button
        className='border border-violet-600 rounded-md text-white p-1 px-2 cursor-pointer absolute right-0 top-0'
        onClick={() => setOpenMenuItem("")}
      >
        X
      </button>
      <div className='flex flex-wrap gap-3 z-10'>
        {users.length > 0
          ? users.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`px-5 py-2 rounded-2xl ${bgGradient} `}
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
