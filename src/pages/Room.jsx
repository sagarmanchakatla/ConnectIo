import React, { useState, useEffect } from "react";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  CallParticipantsList,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./index.css";
import { CgProfile } from "react-icons/cg";

import { useNavigate } from "react-router-dom"; // Correct import

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGFzaF9SZW5kYXIiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0Rhc2hfUmVuZGFyIiwiaWF0IjoxNzI0MjQ4ODY0LCJleHAiOjE3MjQ4NTM2Njl9.wCwrrrp1fDsQTXEfxQAIMV-8UWe9nRV3_MXeoZ6eRtA";
const userId = "Dash_Rendar";
const callId = "BgHYz9y1qHyo";

export default function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Add an empty dependency array to avoid running on every render

  if (!username) {
    return <div>Loading...</div>;
  }

  const user = {
    id: userId, // Use the username as the ID
    name: username,
    image: `https://getstream.io/random_svg/?id=${username}&name=${username}`,
  };

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("default", callId);
  call.join({ create: true });

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [showParticipants, setShowParticipants] = useState(false);

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    if (callingState !== CallingState.JOINED) {
      navigate("/"); // Navigate to the home page if the call is not joined
    }
  }, [callingState, navigate]); // Run this effect when callingState changes

  const toggleParticipantsList = () => {
    setShowParticipants((prevState) => !prevState);
  };

  return (
    <StreamTheme>
      <div className="layout">
        <div className="video-stream">
          <SpeakerLayout participantsBarPosition="bottom" />
        </div>
        {showParticipants && (
          <div className="call-participants-list">
            <CallParticipantsList />
          </div>
        )}
      </div>
      <div className="controls-container">
        <CallControls />
        <button onClick={toggleParticipantsList} className="participants-btn">
          <CgProfile />
        </button>
      </div>
    </StreamTheme>
  );
};
