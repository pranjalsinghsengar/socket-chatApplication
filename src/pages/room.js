import React, { useContext } from "react";
import ChatInput from "../components/chatInput";

import RoomLayout from "../layout/roomLayout";
import { AppContext } from "../context/appContext";
import { bgGradient } from "../styles/globalStyle";

const Room = () => {
  const { users } = useContext(AppContext);
  return (
    <RoomLayout>
      <div className='relative'>
        <div className='fixed bottom-0 py-10  w-full flex flex-col items-center'>
          
          <ChatInput />
        </div>
      </div>
    </RoomLayout>
  );
};

export default Room;
