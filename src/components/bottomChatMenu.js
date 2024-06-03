import React, { useContext, useState } from "react";
import ChatInput from "./chatInput";
import MenuBar from "./menuBar";
import FriendsList from "./friendsList";
import RoomInput from "./roomInput";
import { AppContext } from "../context/appContext";
import { toast } from "react-toastify";
import { darkBlack, shadeBlack } from "../styles/globalStyle";
import { useNavigate } from "react-router-dom";
import Videobuttons from "./videobuttons";

const BottomChatMenu = ({ message, setMessage ,sendMessage }) => {
  const {
    socket,
    currentUser,
    chatlog,
    chatlogEndRef,
    users,
    setUsers,
    currentConversation,
    selectedUser,
    setSelectedUser,
    joinedRooms,
    OpenMenuItem,
    setOpenMenuItem,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const startConversation = (item) => {
    navigate("/");
    if (currentUser) {
      setSelectedUser(item?.name);
      socket.emit("start conversation", {
        user1_ID: currentUser._id,
        user2_ID: item?._id,
      });
      setOpenMenuItem("");
    }
  };

  const [roomName, setRoomName] = useState(null);
  const CreateRoomHandler = (e) => {
    e.preventDefault();
    if (roomName) {
      socket.emit("create room", {
        roomName: roomName,
        user_ID: currentUser._id,
      });
      socket.emit("all joined rooms", { user_ID: currentUser?._id });
      setRoomName("");
      setOpenMenuItem("");
    } else {
      toast("Please enter a room name");
    }
  };
  const [joinRoom, setJoinRoom] = useState(null);

  const JoinRoomHandler = (e) => {
    e.preventDefault();
    // console.log("joinRoom", joinRoom);
    if (joinRoom) {
      socket.emit("join room", {
        roomName: joinRoom,
        user_ID: currentUser?._id,
      });
    }
    setJoinRoom("");
    setOpenMenuItem("");
  };
  const RoomHander = (roomName) => {
    if (roomName) {
      socket.emit("join room", {
        roomName: roomName,
        user_ID: currentUser?._id,
      });
      setOpenMenuItem("");
    }
  };

 

  return (
    <div
      className={` fixed bottom-0 left-[50%] z-10 transform translate-x-[-50%] py-10 pt-4 backdrop-blur-lg w-full flex flex-col items-center `}
    >
      <div className="gap-3 flex text-center">
        {OpenMenuItem === "createRoom" && (
          <RoomInput
            title="Create New Room"
            placeholder="Create Room name "
            value={roomName}
            subtitle={"Create new room then press [enter]"}
            onSubmit={CreateRoomHandler}
            setOpenMenuItem={setOpenMenuItem}
            onChange={(e) => setRoomName(e.target.value)}
          />
        )}
        {OpenMenuItem === "rooms" && (
          <div
            className={`flex flex-col-reverse pb-5 md:flex-row items-center md:px-10 rounded-xl ${darkBlack}`}
          >
            <div className="flex  flex-wrap gap-1 max-w-96 md:text-sm lg:text-base text-xs justify-center md:justify-start">
              {joinedRooms &&
                joinedRooms.map((item, index) => {
                  console.log("==>", item);
                  return (
                    <div
                      key={index}
                      className={`cursor-pointer ${shadeBlack} hover:bg-zinc-950 py-2 px-4 rounded-md hover:border hover:border-slate-50/20`}
                      onClick={() => RoomHander(item.roomName)}
                    >
                      {item.roomName}
                    </div>
                  );
                })}
            </div>
            <RoomInput
              title="Join Room"
              placeholder="Join Room "
              value={joinRoom}
              subtitle={"Enter the room name and press [enter]"}
              onSubmit={JoinRoomHandler}
              setOpenMenuItem={setOpenMenuItem}
              onChange={(e) => setJoinRoom(e.target.value)}
            />
          </div>
        )}
      </div>

      {OpenMenuItem === "Confrence" && <Videobuttons/>}


      {OpenMenuItem === "userList" && (
        <FriendsList
          setOpenMenuItem={setOpenMenuItem}
          users={users}
          startConversation={startConversation}
        />
      )}
      <MenuBar setOpenMenuItem={setOpenMenuItem} OpenMenuItem={OpenMenuItem} />

      <ChatInput
        onSubmit={sendMessage}
        inputValue={message}
        onChange={(e) => setMessage(e.target.value)}
        onClick={() => setOpenMenuItem("")}
      />
    </div>
  );
};

export default BottomChatMenu;
