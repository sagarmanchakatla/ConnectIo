import React, { useState } from "react";
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

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGFzaF9SZW5kYXIiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0Rhc2hfUmVuZGFyIiwiaWF0IjoxNzI0MjQ4ODY0LCJleHAiOjE3MjQ4NTM2Njl9.wCwrrrp1fDsQTXEfxQAIMV-8UWe9nRV3_MXeoZ6eRtA";
const userId = "Dash_Rendar";
const callId = "BgHYz9y1qHyo";

const user = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function App() {
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
  const [showParticipants, setShowParticipants] = useState(true);

  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  const toggleParticipantsList = () => {
    setShowParticipants((prevState) => !prevState);
  };

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

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
