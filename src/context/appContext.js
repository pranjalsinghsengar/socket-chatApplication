import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { io } from "socket.io-client";

export const AppContext = createContext();

const ChatContext = ({ children }) => {
  const navigate = useNavigate();
  const chatlogEndRef = useRef(null);
  const socket = useMemo(
    () => io("http://localhost:8000", { autoConnect: true }),
    []
  );
  const [OpenMenuItem, setOpenMenuItem] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  //   const [currentMessage, setCurrentMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatlog, setChatLog] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomUsers, setRoomUsers] = useState(null);
  const [roomConversations, setRoomConversations] = useState(null);
  const [joinedRooms, setJoinedRooms] = useState(null);

  const scrollToBottom = () => {
    chatlogEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatlog]);

  useEffect(() => {
    if (!currentUser) {
      const UserDetails = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(UserDetails);
      socket.emit("login");
      socket.emit("all joined rooms", { user_ID: UserDetails?._id });
      console.warn("All rooms triggered");
    }

    socket.on("connection", () => {
      console.log("socket connected", socket.id);
    });

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
      if (currentUser) {
        const filteredUsers = users.filter(
          (user) => user?._id !== currentUser?._id
        );
        setUsers(filteredUsers);
        // console.warn("filteredUsers", currentUser?._id)
      }
    });

    socket.on("conversation started", (conversation) => {
      setCurrentConversation(conversation);
      setChatLog(conversation.messages);
      console.log("Conversation started", conversation);
    });

    socket.on("create room", (roomDetails) => {
      console.log("Room created", roomDetails);
      toast.success("Room Created");
      if (roomDetails._id) {
        navigate("/room");
        //   localStorage.setItem("room", JSON.stringify());
      }
    });
    socket.on("join room", (roomDetails) => {
      console.log("Room Joined", roomDetails);
      if (roomDetails._id) {
        socket.emit("room users", { user_ID: roomDetails?.participants });

        navigate("/room");
        setRoomDetails(roomDetails);
        setRoomConversations(roomDetails?.messages);
      }
      toast.success("joined room");
    });

    socket.on("room users", (joinedUsers) => {
      if (joinedUsers.length > 0) {
        setRoomUsers(joinedUsers);
      }
    });
    socket.on("room chat", (roomMessage) => {
      if (roomMessage?.messages.length > 0) {
        setRoomConversations(roomMessage?.messages);
      }
      console.warn("roomMessage", roomMessage);
    });

    socket.on("all joined rooms", (joinedRooms) => {
      setJoinedRooms(joinedRooms);
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
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        OpenMenuItem,
        setOpenMenuItem,
        socket,
        currentUser,
        chatlog,
        chatlogEndRef,
        users,
        setUsers,
        currentConversation,
        selectedUser,
        setSelectedUser,
        roomDetails,
        roomUsers,
        roomConversations,
        joinedRooms,
      }}
    >
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export default ChatContext;
