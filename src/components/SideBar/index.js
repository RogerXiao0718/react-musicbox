import React from "react";
import Youtube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";

import appStoreImg from "./apple-app-store.png";
import gglPlayImg from "./google-play-store.png";

const SideBar = () => {
  const { currPlayList, currIndex, isPause, player } = useSelector((state) => ({
    currPlayList: state.player.currPlayList,
    currPlayer: state.player.currPlayer,
    currIndex: state.player.currIndex,
    isPause: state.player.isPause,
    player: state.player.currPlayer,
  }));
  const dispatch = useDispatch();

  const onReady = (event) => {
    dispatch({
      type: "SET_CURR_PLAYER",
      newPlayer: event.target,
    });
  };

  const onVideoStatusChanged = (event) => {
    switch (event.data) {
      case -1:
        // unstarted
        break;
      case 0:
        // ended
        dispatch({
          type: "SET_CURR_INDEX",
          index: (currIndex + 1) % currPlayList.length,
        });
        dispatch({
          type: "SET_CURR_VIDEO",
          id: currPlayList[(currIndex + 1) % currPlayList.length],
        });
        player.loadVideoById(
          currPlayList[(currIndex + 1) % currPlayList.length]
        );
        if (isPause) {
          dispatch({
            type: "CHANGE_PLAYSTATE",
          });
        }
        break;
      case 1:
        // playing
        break;
      case 2:
        // paused
        break;
      default:
        break;
    }
  };

  return (
    <div className="sidebar">
      <div className="youtube-drag-container">
        <Youtube
          videoId={currPlayList[0]}
          className="yt-video"
          opts={{
            playerVars: {
              loop: 1,
              controls: 0,
            },
          }}
          onReady={onReady}
          onStateChange={onVideoStatusChanged}
        />
      </div>
    </div>
  );
};

export default SideBar;
