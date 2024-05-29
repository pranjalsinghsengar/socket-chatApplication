import { io } from "socket.io-client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import MenuBar from "../components/menuBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FriendsList from "../components/friendsList";
import { useNavigate } from "react-router-dom";
import ChatInput from "../components/chatInput";
import Layout from "../layout/layout";
import { bgGradient, darkBlack, shadeBlack } from "../styles/globalStyle";
import RoomInput from "../components/roomInput";
import { AppContext } from "../context/appContext";

function Dashboard() {
  const [OpenMenuItem, setOpenMenuItem] = useState("");
  const {
    socket,
    currentUser,
    chatlog,
    users,
    setUsers,
    currentConversation,
    selectedUser,
    setSelectedUser,
  } = useContext(AppContext);

  const [message, setMessage] = useState("");

  console.log("currentUser", currentUser);

  const sendMessage = (e) => {
    e.preventDefault();

    if (currentConversation) {
      const data = {
        conversationId: currentConversation._id,
        senderId: currentUser._id,
        message,
      };
      socket.emit("chat message", data);
      setMessage("");
    } else {
      toast("Please select a user to chat with");
    }
  };

  const startConversation = (item) => {
    if (currentUser) {
      setSelectedUser(item?.name);
      socket.emit("start conversation", {
        user1_ID: currentUser._id,
        user2_ID: item?._id,
      });
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
      setRoomName("");
    } else {
      toast("Please enter a room name");
    }
  };
  const [joinRoom, setJoinRoom] = useState(null);

  const JoinRoomHandler = (e) => {
    e.preventDefault();
    console.log("joinRoom", joinRoom);
    if (joinRoom) {
      socket.emit("join room", {
        roomName: joinRoom,
        user_ID: currentUser?._id,
      });
    }
    setJoinRoom("");
  };

  console.log("users", users);
  console.log("chatlog", chatlog);
  return (
    <Layout>
      <div className='flex flex-col justify-start items-center h-full '>
        <h1
          className={`flex text-white flex-col font-bold text-xl tracking-widest py-5 pb-5 w-full  bg-gradient-to-b from-${darkBlack} from-80% to-white/30 text-center z-10`}
        >
          Socket.io
          <span className='text-sm font-mono tracking-normal font-normal'>
            {currentUser?.name} <span className='font-bold'>X</span>{" "}
            {selectedUser}
          </span>
        </h1>

        <div className='overflow-scroll w-full flex justify-center mb-40 -mt-8 pt-10'>
          <div className={`w-9/12 flex flex-col gap-2 h-full    `}>
            {chatlog.length > 0 &&
              chatlog?.map((item, index) => {
                console.log(
                  "item.senderId === currentUser.senderId",
                  item.senderId,
                  currentUser._id
                );
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
                      className={` px-5 py-2 rounded-xl  text-white  ${
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
          </div>
        </div>

        <div className=' fixed bottom-0 py-10  w-full flex flex-col items-center '>
          <div className='gap-3 flex text-center'>
            {/* <form onSubmit={CreateRoomHandler}>
              <input
                placeholder=''
                className={`outline-none rounded-md text-lg py-3 px-4 ${shadeBlack} `}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <div className='text-green-500 capitalize text-sm'>
                press enter to create new room
              </div>
              <button type='submit'></button>
            </form> */}

            {OpenMenuItem === "createRoom" && (
              <RoomInput
                title='Create New Room'
                placeholder='Create Room name '
                value={roomName}
                subtitle={"Create new room then press [enter]"}
                onSubmit={CreateRoomHandler}
                onChange={(e) => setRoomName(e.target.value)}
              />
            )}
            {OpenMenuItem === "joinRoom" && (
              <RoomInput
                title='Join Room'
                placeholder='Join Room '
                value={joinRoom}
                subtitle={"Enter the room name and press [enter]"}
                onSubmit={JoinRoomHandler}
                onChange={(e) => setJoinRoom(e.target.value)}
              />
            )}
          </div>

          {OpenMenuItem === "userList" && (
            <FriendsList
              setOpenMenuItem={setOpenMenuItem}
              users={users}
              startConversation={startConversation}
            />
          )}
          <MenuBar
            setOpenMenuItem={setOpenMenuItem}
            OpenMenuItem={OpenMenuItem}
          />

          <ChatInput
            onSubmit={sendMessage}
            inputValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
