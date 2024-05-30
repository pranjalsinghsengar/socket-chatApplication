import { io } from "socket.io-client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import MenuBar from "../components/menuBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FriendsList from "../components/friendsList";
import { useNavigate } from "react-router-dom";
import ChatInput from "../components/chatInput";
import Layout from "../layout/layout";
import { bgGradient, darkBlack, shadeBlack } from "../styles/globalStyle";
import RoomInput from "../components/roomInput";
import { AppContext } from "../context/appContext";
import BottomChatMenu from "../components/bottomChatMenu";

function Dashboard() {
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
    joinedRooms,OpenMenuItem, setOpenMenuItem
  } = useContext(AppContext);

  const [message, setMessage] = useState("");

  console.log("currentUser", currentUser);


 
  console.log("users", users);
  console.log("chatlog", chatlog);
  return (
    <Layout>
      <div className="flex flex-col justify-start items-center h-full pb-10 ">
        <h1
          className={`flex text-white justify-between items-center px-10 font-bold text-xl tracking-widest py-3  w-full bg-gradient-to-b from-black via-black to-black/10   text-center z-10`}
        >
          Socket.io
          <span className="text-sm font-mono tracking-normal font-normal">
            {currentUser?.name}
            {selectedUser && (
              <>
                {" "}
                <span className="font-bold">X</span> {selectedUser}
              </>
            )}
          </span>
        </h1>

        {!selectedUser && (
          <div className="font-bold text-4xl flex items-center h-full opacity-30 ">
            <p>Select User for chat</p>{" "}
          </div>
        )}

        <div
          className="overflow-scroll w-full flex justify-center h-full mb-20  -mt-8 pt-10"
          onClick={() => setOpenMenuItem("")}
        >
          <div className={`w-9/12 flex flex-col gap-4 h-full text-xs md:text-sm lg:text-base   `}>
            {chatlog.length > 0 &&
              chatlog?.map((item, index) => {
                
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
                      className={` px-5 py-2 rounded-xl max-w-[80%] md:max-w-[70%] lg:max-w-[60%] whitespace-pre-wrap overflow-auto text-white  ${
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
            <div ref={chatlogEndRef} className="py-5"></div>
          </div>
        </div>


        <BottomChatMenu message={message} setMessage={setMessage} />

        {/* <div className=" fixed bottom-0 left-[50%] z-10 transform translate-x-[-50%] py-10 pt-4 backdrop-blur-lg w-full flex flex-col items-center ">
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
              <div className="flex items-center">
                <div className="flex flex-wrap gap-1 max-w-96">
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
            onClick={() => setOpenMenuItem("")}
          />
        </div> */}
      </div>
    </Layout>
  );
}

export default Dashboard;
