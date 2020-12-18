import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { parse, toSeconds } from "iso8601-duration";
import TimeFormat from "hh-mm-ss";

import youtubeApi, { KEY } from "../../apis/youtubeApi";

import "./styles.css";

const PlayController = () => {
  const {
    videoId,
    player,
    isPause,
    currIndex,
    currPlayList,
    currVideoTitle,
    currDuration,
  } = useSelector((state) => ({
    videoId: state.player.currVideoId,
    player: state.player.currPlayer,
    isPause: state.player.isPause,
    currIndex: state.player.currIndex,
    currPlayList: state.player.currPlayList,
    currVideoTitle: state.player.currVideoTitle,
    currDuration: state.player.currDuration,
  }));
  const dispatch = useDispatch();

  const [currTimeInSecond, setCurrTimeInSecond] = useState(0);

  useEffect(() => {
    youtubeApi
      .get("/videos", {
        params: {
          id: videoId,
          key: KEY,
          part: "snippet, contentDetails",
        },
      })
      .then((response) => {
        const item = response.data.items[0];
        dispatch({
          type: "SET_CURR_TITLE",
          currVideoTitle: item.snippet.title,
        });
        dispatch({
          type: "SET_CURR_DURATION",
          currDuration: item.contentDetails.duration,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, videoId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (player) {
        const timeInSecond = Math.floor(player.getCurrentTime());
        setCurrTimeInSecond(timeInSecond);
      }
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, [player]);

  const controlBtnClasses = classnames({
    ctrl: true,
    "pause-btn": !isPause,
    "play-btn": isPause,
  });

  const onPlayStateClick = (event) => {
    if (isPause) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
    dispatch({
      type: "CHANGE_PLAYSTATE",
    });
  };

  const onPreClick = (event) => {
    dispatch({
      type: "SET_CURR_INDEX",
      index: currIndex === 0 ? currPlayList.length - 1 : currIndex - 1,
    });
    dispatch({
      type: "SET_CURR_VIDEO",
      id:
        currPlayList[currIndex === 0 ? currPlayList.length - 1 : currIndex - 1],
    });
    player.loadVideoById(
      currPlayList[currIndex === 0 ? currPlayList.length - 1 : currIndex - 1]
    );
    if (isPause) {
      dispatch({
        type: "CHANGE_PLAYSTATE",
      });
    }
  };

  const onNextClick = (event) => {
    dispatch({
      type: "SET_CURR_INDEX",
      index: (currIndex + 1) % currPlayList.length,
    });
    dispatch({
      type: "SET_CURR_VIDEO",
      id: currPlayList[(currIndex + 1) % currPlayList.length],
    });
    player.loadVideoById(currPlayList[(currIndex + 1) % currPlayList.length]);
    if (isPause) {
      dispatch({
        type: "CHANGE_PLAYSTATE",
      });
    }
  };

  const onVolumeChange = (event) => {
    player.setVolume(event.target.value);
  };

  const onSliderChanged = (event) => {
    player.seekTo(event.target.value);
    if (isPause) {
      player.playVideo();
      dispatch({
        type: "CHANGE_PLAYSTATE",
      });
    }
    setCurrTimeInSecond(parseInt(event.target.value));
  };

  return (
    <div className="play-control-container">
      <input
        className="progress-bar"
        type="range"
        step={1}
        min={0}
        max={currDuration ? toSeconds(parse(currDuration)) : 0}
        onChange={onSliderChanged}
        value={currTimeInSecond}
      />
      <div className="time-duration-section">
        <span>
          {TimeFormat.fromS(
            !isNaN(currTimeInSecond) ? currTimeInSecond : 0,
            "mm:ss"
          )}
        </span>
        <span className="curr-vi-duration">
          {TimeFormat.fromS(
            currDuration ? toSeconds(parse(currDuration)) : 0,
            "mm:ss"
          )}
        </span>
      </div>
      <div className="play-controller">
        <div className="ctrls">
          <button className="ctrl play-back-btn">
            <i className="fas fa-undo-alt" />
          </button>
          <button
            className="ctrl pre-vid-btn"
            title="previous"
            onClick={onPreClick}
          >
            <i className="fas fa-fast-backward" />
          </button>
          <button
            className={controlBtnClasses}
            title="play or pause"
            onClick={onPlayStateClick}
          >
            {isPause ? (
              <i className="fas fa-play" />
            ) : (
              <i className="fas fa-pause" />
            )}
          </button>
          <button
            className="ctrl next-vid-btn"
            title="next"
            onClick={onNextClick}
          >
            <i className="fas fa-fast-forward" />
          </button>
          <button className="ctrl play-forward-btn">
            <i className="fas fa-redo-alt" />
          </button>
          <div className="volume-container ctrl">
            <input
              className="volume-scroller"
              type="range"
              min={0}
              max={100}
              step={1}
              title="volume bar"
              onChange={onVolumeChange}
            />
            <i className="fas fa-volume-up" />
          </div>
        </div>
        <span className="curr-vid-name">{currVideoTitle}</span>
        <button className="play-speed">1x</button>
      </div>
    </div>
  );
};

export default PlayController;
