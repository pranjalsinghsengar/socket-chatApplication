import { io } from "socket.io-client";
import React, { useEffect, useMemo, useState } from "react";
import MenuBar from "../components/menuBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FriendsList from "../components/friendsList";
import { useNavigate } from "react-router-dom";
import ChatInput from "../components/chatInput";

function Dashboard() {
  const [openFriendList, setOpenFriendList] = useState(false);

  const socket = useMemo(
    () => io("http://localhost:8000", { autoConnect: true }),
    []
  );
  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatlog, setChatLog] = useState([]);
  const UserDetails = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log("currentUser", currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentUser(UserDetails);

    socket.on("connection", () => {
      console.log("socket connected", socket.id);
    });
    socket.emit("login");

    socket.on("error", (message) => {
      toast.error(message);
    });

    socket.on("chat message", (data) => {
      console.log("Message received:", data);
      setChatLog((prevLog) => [...prevLog, data]);
    });

    socket.on("currentMessage", (message) => {
      setCurrentMessage((prevMessages) => [...prevMessages, message]);
    });
    socket.on("userlist", (users) => {
      setUsers(users);
    });

    socket.on("conversation started", (conversation) => {
      setCurrentConversation(conversation);
      setChatLog(conversation.messages);
      console.log("Conversation started", conversation);
    });

    socket.on("create room", (roomDetails) => {
      console.log("Room created", roomDetails);
      if (roomDetails._id) navigate("/room");
    });
    socket.on("join room", (roomDetails) => {
      console.log("Room Joined", roomDetails);
      if (roomDetails._id) navigate("/room");
      toast.success("joined room") 
    });

    

    return () => {
      socket.off("connection");
      socket.off("login");
      socket.off("message");
      socket.off("currentMessage");
      socket.off("userlist");
    };
  }, []);

  // const SubmitHandler = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     senderId:  UserDetails?._id,
  //     receiverId: "6656bf30d1a825114cf58064",
  //     message: message,
  //   };
  //   socket.emit("message", payload);
  //   setMessage("");
  // };

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
        user1_ID: currentUser._id,
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
    if(joinRoom){
      socket.emit("join room", {roomName : joinRoom, user_ID:currentUser._id});
    }
    // setJoinRoom("")
  }
  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen ">
      <h1 className="flex flex-col font-bold text-xl tracking-widest py-5 pb-5 w-full  bg-gradient-to-b from-white from-80% to-white/30 text-center z-10">
        Socket.io
        <span className="text-sm font-mono tracking-normal font-normal">
          {currentUser?.name} <span className="font-bold">X</span>{" "}
          {selectedUser}
        </span>
      </h1>

      <div className="overflow-scroll w-full flex justify-center mb-40 -mt-8 pt-10">
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
                  <div className="bg-gray-200 px-5 py-2 rounded-2xl">
                    {item.message}
                  </div>
                </div>
              );
            })}
         
        </div>
      </div>

      <div className=" fixed bottom-0 py-10  w-full flex flex-col items-center ">
        {!openFriendList ? (
          <MenuBar
            setOpenFriendList={setOpenFriendList}
            setRoomName={setRoomName}
            CreateRoomHandler={CreateRoomHandler}
            JoinRoomHandler={JoinRoomHandler}
            setJoinRoom={setJoinRoom}
          />
        ) : (
          <FriendsList
            setOpenFriendList={setOpenFriendList}
            users={users}
            startConversation={startConversation}
          />
        )}

<ChatInput onSubmit={sendMessage} inputValue={message} onChange={(e) => setMessage(e.target.value)}  />
       
      </div>

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
