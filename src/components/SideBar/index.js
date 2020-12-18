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
      <div className="song-list-opt">
        <Link to="#">我的歌單</Link>
        <Link to="#">DJs</Link>
      </div>
      <div className="recommend-song-opt">
        <Link to="#">每日精選</Link>
        <Link to="#">MixerBox Champion</Link>
        <Link to="#">熱門榜單</Link>
        <Link to="#">歌手</Link>
        <Link to="#">最新發行</Link>
        <Link to="#">曲風類型</Link>
      </div>
      <div className="dl-opts">
        <button className="app-store-dl">
          <img src={appStoreImg} alt="download from app store" />
        </button>
        <button className="gp-store-dl">
          <img src={gglPlayImg} alt="download from google play" />
        </button>
      </div>
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
