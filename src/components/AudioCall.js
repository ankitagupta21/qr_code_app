import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function AudioCall() {
  const [callStatus, setCallStatus] = useState("Calling");
  const [isMuted, setIsMuted] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state.id;
  useEffect(() => {
    initiateAudioCall(phoneNumber);
    const callStatusUpdateInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        setCallStatus("Call Ended");
        endAudioCall();
      } else {
        setCallStatus("Connected");
      }
    }, 3000);
    return () => {
      clearInterval(callStatusUpdateInterval);
    };
  }, [phoneNumber]);

  const initiateAudioCall = (phoneNumber) => {
    console.log(`Initiating audio call to ${phoneNumber}`);
    setTimeout(() => {
      console.log("Audio call connected");
      setCallStatus("Connected");
    }, 2000);
  };

  const endAudioCall = () => {
    console.log("Ending audio call");
    history("/home");
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <div className="container">
      <h2 className="heading1">Audio Call</h2>
      <div className="label">Status: {callStatus}</div>
      <div className="label">Participant: {phoneNumber}</div>
      <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
      <button onClick={endAudioCall}>End Call</button>
    </div>
  );
}

export default AudioCall;
