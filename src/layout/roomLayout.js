import React, { useCallback, useContext, useEffect, useState } from "react";
import Layout from "./layout";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { bgGradient, darkBlack, shadeBlack } from "../styles/globalStyle";
import BottomChatMenu from "../components/bottomChatMenu";

const RoomLayout = ({ children }) => {
  const {socket, roomUsers, roomDetails,currentUser } = useContext(AppContext);
  const navigation = useNavigate();
  useEffect(() => {
    if (!roomDetails ) {
      navigation("/");
    }
    
  }, [roomDetails, navigation]);


  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("room chat", {
      roomId: roomDetails._id,
      senderId: currentUser._id,
      message: message,
    });
    setMessage("")
  };


  return (
    <Layout>
      <div
        className={` backdrop-blur-lg bg-transparent flex justify-between px-4 md:px-20 py-3 pb-5 items-center relative z-20`}
      >
        <h1 className='text-xl md:text-3xl lg:text-6xl font-bold text-white '>
          {roomDetails?.roomName}
        </h1>



        <div className={`${shadeBlack} md:px-5 px-0 rounded-lg  w-9/12 md:max-w-96 py-1 md:py-3 max-h-20 overflow-auto`}>
          <div className='flex gap-1 md:gap-2 flex-wrap justify-center'>
            {roomUsers && roomUsers.length > 0
              ? roomUsers.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`px-4 py-0.5 rounded-full text-xs md:text-sm ${bgGradient} `}
                      // onClick={() => startConversation(item)}
                    >
                      {item.name}
                    </button>
                  );
                })
              : "NO USERS"}
          </div>
        </div>
      </div>
      
      
      
      {children}

      <BottomChatMenu message={message} setMessage={setMessage } sendMessage={sendMessage} />
      
    </Layout>
  );
};

export default RoomLayout;
