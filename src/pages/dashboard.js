import { io } from "socket.io-client";
import React, { useEffect, useMemo, useState } from "react";
import MenuBar from "../components/menuBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const socket = useMemo(() => io("http://localhost:8000"), []);
  const [massage, setmassage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });

    socket.on("message", (message) => {
      setAllMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("initialMessages");
      socket.off("message");
    };
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      text: massage,
      user: "User",
      timestamp: new Date(),
    };
    socket.emit("message", payload);
    setmassage("");
  };

  console.log(allMessages);
  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen">
      <h1 className=" font-bold text-xl tracking-widest py-5 pb-14 w-full bg-gradient-to-b from-white from-70% to-transparent text-center z-10">
        Socket.io
      </h1>
      <div className={`w-9/12 flex flex-col items-start  gap-2`}>
        {allMessages.map((item, index) => (
          <div key={index} className="bg-gray-200 px-5 py-2 rounded-2xl">
            {item}
          </div>
        ))}
      </div>

      <div className=" fixed  bottom-10 w-full flex flex-col items-center ">
        <MenuBar/>
        <form onSubmit={SubmitHandler} className="w-8/12 flex gap-2" >
          <input
            className="w-full border-4 border-violet-200 rounded-lg outline-violet-400  px-3 py-2"
            placeholder="kuch toh likh do"
            value={massage}
            onChange={(e) => setmassage(e.target.value)}
          />
          <button
            className="bg-violet-700 text-white font-bold rounded-md px-5"
            type="submit"
          >
            Bhej doo
          </button>
        </form>
      </div>
      <ToastContainer />

    </div>
  );
}

export default Dashboard;
