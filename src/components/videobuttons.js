import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { darkBlack, shadeBlack } from "../styles/globalStyle";
import ReactPlayer from "react-player";
import { AppContext } from "../context/appContext";
import Peer from "peerjs";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import peer from "../service/peers"

const Videobuttons = () => {
  const { socket, currentUser, confrenceid, joinedInConfrence } =
    useContext(AppContext);
  const [openStreamOptions, setOpenStreamOptions] = useState(false);
  console.log("openStreamOptions");
  const [myStream, setMyStream] = useState(null);
  const peerInstance = useRef(null);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const [joinId, setJoinId] = useState("");

  const [peerId, setPeerId] = useState(null);
  const [isJoined, setIsJoined] = useState(false)

  const HandlerStream = useCallback(async () => {
    //   const stream = await navigator.mediaDevices.getUserMedia({
    //     audio: true,
    //     video: true,
    //   });
    //   // const offer = await peer.getOffer();
    //   // socket.emit("confrence:call",{to: joinedInConfrence, offer })
    //   // setMyStream(stream);
  }, []);

 

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      console.log("peer iD", id);
      setPeerId(id);
    });
    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: false }, (stream) => {
        console.log("stream",stream);
        currentUserVideoRef.current.srcObject = stream;
        currentUserVideoRef.current.play();
        call.answer(stream);
        call.on("stream", (mediaStream) => {
          console.log("mediaStream", mediaStream);
          remoteVideoRef.current.srcObject = mediaStream;
          remoteVideoRef.current.play();
        });
      });
    });
    peerInstance.current = peer;
  }, []);

  const joinConfrenceHandler = () => {
    if (joinId) {
      Call(joinId);
    }
  };

  const CreateMeetingHandler = () => {
    setOpenStreamOptions(true);
  };

  const Call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    getUserMedia(
      { video: true, audio: false },
      (stream) => {
        currentUserVideoRef.current.srcObject = stream;
        currentUserVideoRef.current.play();

        var call = peerInstance.current.call(remotePeerId, stream);


        call.on("stream", (remoteStream) => {
          console.log("remoteStream", remoteStream);
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      },
      (err) => {
        console.log("Failed to get local stream", err);
      }
    );
  };

  return (
    <div
      className={`flex ${darkBlack} border border-zinc-50/10 rounded-lg p-2  gap-3 lg:w-3/6 `}
    >
      {openStreamOptions && peerId ? (
        <OpenStream
          setOpenStreamOptions={setOpenStreamOptions}
          HandlerStream={HandlerStream}
          myStream={myStream}
          confrenceid={confrenceid}
          currentUserVideoRef={currentUserVideoRef}
          remoteVideoRef={remoteVideoRef}
          peerId={peerId}
          isJoined={isJoined}
          setIsJoined={setIsJoined}
        />
      ) : (
        <div className={`flex justify-between w-full md:flex-row `}>
          <div className="w-full flex justify-center items-start flex-col md:px-10">
            <h1 className="mb-4 font-semibold text-xs md:text-lg ">
              Create Confrence now
            </h1>
            <button
              className="bg-blue-700 px-7 py-2 rounded-md text-xs md:text-base "
              onClick={CreateMeetingHandler}
            >
              Create
            </button>
          </div>

          <div
            className={`flex flex-col bg-zinc-950 w-full md:py-10 md:px-10 p-3 rounded-md justify-center items-start `}
          >
            <h1 className="mb-4 font-semibold text-sm md:text-lg">
              Join Confrence
            </h1>
            <div>
              <video ref={currentUserVideoRef}></video>
              <video ref={remoteVideoRef}></video>
              <input
                placeholder={"Enter Confrence ID"}
                className={`outline-none rounded-md md:rounded-xl  text-xs md:text-sm  py-3 px-4 w-full ${shadeBlack}  `}
                onChange={(e) => setJoinId(e.target.value)}
                value={joinId}
              />
              <button
                className="bg-blue-700 mt-2 px-7 py-2 rounded-md text-xs md:text-base "
                onClick={joinConfrenceHandler}
              >
                join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videobuttons;

const OpenStream = ({
  myStream,
  setOpenStreamOptions,
  HandlerStream,
  confrenceid,
  currentUserVideoRef,
  peerId,remoteVideoRef,
  isJoined,setIsJoined
}) => {


  const [isCopied, setIsCopied] = useState(false);

  const onCopyHandler = () => {
    setIsCopied(true);
    console.log("Copied");
    setTimeout(() => setIsCopied(false), 2500); // Hide the success message after 2.5 seconds
  };
  return (
    <div className="w-full">
      <div
        className=" text-lg cursor-pointer"
        onClick={() => setOpenStreamOptions(false)}
      >
        {"<"}
      </div>
      <div className="flex flex-col-reverse md:flex-row  w-full rounded-lg overflow-hidden relative ">
        {!isJoined && <div className="w-full flex px-5 flex-col pt-8 gap-5">
          <h1 className="text-lg font-semibold">Join in this meeting</h1>
          <div>
            <h1 className="text-sm">ConfrenceID:</h1>
            <CopyToClipboard text={peerId} onCopy={onCopyHandler}>

            <button className="bg-zinc-900 px-7 py-3 rounded-md text-zinc-400">
              {peerId}
            </button>
            </CopyToClipboard>
          </div>
          <button
        
        onClick={() => setIsJoined(true) }
            className="bg-blue-700 px-7 py-2 rounded-md "
          >
            Join
          </button>
        </div>}
        <div className="w-full flex flex-col justify-center px-3">
          {/* <ReactPlayer  url={myStream} playing muted  width={300} height={300} /> */}
          <video ref={currentUserVideoRef} className="w-24 absolute  right-0 bottom-0"></video>
          <video ref={remoteVideoRef}></video>
        </div>
      </div>
    </div>
  );
};
