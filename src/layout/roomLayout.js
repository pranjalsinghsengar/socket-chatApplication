import React, { useContext, useEffect } from "react";
import Layout from "./layout";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { bgGradient, darkBlack, shadeBlack } from "../styles/globalStyle";

const RoomLayout = ({ children }) => {
  const { roomDetails, users } = useContext(AppContext);
  const navigation = useNavigate();
  useEffect(() => {
    if (!roomDetails) {
      navigation("/home");
    }
  }, [roomDetails, navigation]);

  return (
    <Layout>
      <div
        className={`${darkBlack} flex justify-between px-20 py-3 items-center`}
      >
        <h1 className='text-6xl font-bold text-white '>
          {roomDetails?.roomName}
        </h1>
        <div className={`${shadeBlack} px-5 rounded-lg max-w-96 py-3 max-h-20 overflow-auto`}>
          <div className='flex gap-2 flex-wrap justify-center'>
            {users.length > 0
              ? roomDetails?.participants?.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`px-4 py-0.5 rounded-full text-sm ${bgGradient} `}
                      // onClick={() => startConversation(item)}
                    >
                      {item}
                    </button>
                  );
                })
              : "NO USERS"}
          </div>
        </div>
      </div>
      {children}
    </Layout>
  );
};

export default RoomLayout;
