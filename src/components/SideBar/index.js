import React from "react";
import Youtube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";

const SideBar = () => {
  const { currPlayList, currIndex, isPause, player, playMode } = useSelector((state) => ({
    currPlayList: state.player.currPlayList,
    currPlayer: state.player.currPlayer,
    currIndex: state.player.currIndex,
    isPause: state.player.isPause,
    player: state.player.currPlayer,
    playMode: state.player.playMode
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
        let nextIndex;

        // 根據不同playMode指定下一首個
        if (playMode === "normal") {
          nextIndex = (currIndex + 1);
        } else if (playMode === "random") {
          do {
            nextIndex = Math.floor(Math.random() * currPlayList.length);
          } while (nextIndex === currIndex && currPlayList.length !== 1);
        } else if (playMode === "loop") {
          nextIndex = currIndex;
        }

        dispatch({
          type: "SET_CURR_INDEX",
          index: nextIndex % currPlayList.length,
        });
        dispatch({
          type: "SET_CURR_VIDEO",
          id: currPlayList[nextIndex % currPlayList.length],
        });
        player.loadVideoById(
          currPlayList[nextIndex % currPlayList.length]
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
