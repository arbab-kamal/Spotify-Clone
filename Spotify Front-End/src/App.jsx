/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Sidebar from "./component/Sidebar";
import Player from "./component/Player";
import Display from "./component/Display";
import { PlayerContext } from "./context/PlayerContext";
const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}

      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
};

export default App;
