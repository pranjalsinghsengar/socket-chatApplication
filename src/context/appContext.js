import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { io } from "socket.io-client";

export const AppContext = createContext();

const ChatContext = ({ children }) => {
  const navigate = useNavigate();
  const socket = useMemo(
    () => io("http://localhost:8000", { autoConnect: true }),
    []
  );

  const [currentUser, setCurrentUser] = useState(null);
  //   const [currentMessage, setCurrentMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatlog, setChatLog] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      const UserDetails = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(UserDetails);
    }

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

    // socket.on("currentMessage", (message) => {
    //   setCurrentMessage((prevMessages) => [...prevMessages, message]);
    // });
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
      toast.success("Room Created");
      // if (roomDetails._id) navigate("/room");
    });
    socket.on("join room", (roomDetails) => {
      console.log("Room Joined", roomDetails);
      if (roomDetails._id) {
        navigate("/room");
        setRoomDetails(roomDetails);
      }
      toast.success("joined room");
    });

    return () => {
      socket.off("connection");
      socket.off("login");
      socket.off("error");
      socket.off("chat message");
      socket.off("conversation started");
      socket.off("userlist");
      socket.off("create room");
      socket.off("join room");
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        socket,
        currentUser,
        chatlog,
        users,
        setUsers,
        currentConversation,
        selectedUser,
        setSelectedUser,
        roomDetails,
      }}
    >
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export default ChatContext;
