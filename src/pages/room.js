import React, { useContext, useState } from "react";
import ChatInput from "../components/chatInput";

import RoomLayout from "../layout/roomLayout";
import { AppContext } from "../context/appContext";
import { bgGradient } from "../styles/globalStyle";

const Room = () => {
  const { socket, roomDetails, currentUser, roomConversations, chatlogEndRef } =
    useContext(AppContext);
  const [message, setMessage] = useState(null);

  const MessageSubmithandler = (e) => {
    e.preventDefault();
    socket.emit("room chat", {
      roomId: roomDetails._id,
      senderId: currentUser._id,
      message: message,
    });
    setMessage("")
  };
  return (
    <RoomLayout>
      <div className="relative h-full pb-10">
        {roomConversations && roomConversations.length === 0 && (
          <div className="text-white font-bold text-5xl opacity-35 flex items-center justify-center mt-52">
            <p> "No Message here" </p>
          </div>
        )}

        <div
          className="overflow-scroll w-full flex justify-center h-full -mt-4 pt-4  "
          //   onClick={() => setOpenMenuItem("")}
        >
          <div className={`w-9/12 flex flex-col gap-4 h-full   `} >
            {roomConversations &&
              roomConversations.length > 0 &&
              roomConversations?.map((item, index) => {
                // console.log(
                //   "item.senderId === currentUser.senderId",
                //   item.senderId,
                //   currentUser._id
                // );
                return (
                  <div
                    key={index}
                    className={` flex  ${
                      item.senderId === currentUser._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={` px-5 py-2 rounded-xl max-w-[60%] whitespace-pre-wrap overflow-auto text-white  ${
                        item.senderId === currentUser._id
                          ? "bg-gray-700 "
                          : `${bgGradient}`
                      } `}
                    >
                      {item.message}
                    </div>
                  </div>
                );
            })}
            <div ref={chatlogEndRef} className="py-24 "></div>
          </div>
        </div>

        <div className=" fixed bottom-0 left-[50%] z-10 transform translate-x-[-50%] py-10 pt-4 backdrop-blur-lg w-full flex flex-col items-center ">
          <ChatInput
            onSubmit={MessageSubmithandler}
            inputValue={message}
            onChange={(e) => setMessage(e.target.value)}
            onClick={null}
          />
        </div>
      </div>
    </RoomLayout>
  );
};

export default Room;
