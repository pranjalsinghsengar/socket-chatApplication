import React from "react";

const FriendsList = ({ setOpenFriendList,users,startConversation }) => {
  return (
    <div className="border border-violet-600 p-3 relative max-h-52 min-h-32 w-9/12 mb-2 rounded-lg bg-white">
      <button
        className="border border-violet-600 rounded-md p-1 px-2 cursor-pointer absolute right-0 top-0"
        onClick={() => setOpenFriendList(false)}
      >
        X
      </button>
      <div className="flex gap-3 z-10">
        {users.length > 0
          ? users.map((item, index) => {
              return (
                <button
                  key={index}
                  className="bg-gray-200 px-5 py-2 rounded-2xl"
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
