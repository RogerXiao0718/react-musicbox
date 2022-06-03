import React from "react";
import { toSeconds } from "iso8601-duration";
import { useDispatch, useSelector } from "react-redux";
import TimeFormat from "hh-mm-ss";
import ReactIsInDevelopmentMode from "../../ReactIsInDevelopmentMode";

import "./styles.css";

const VideoItem = ({
  index,
  videoId,
  title,
  duration,
}) => {

  const { player, isPause, socket } = useSelector((state) => ({
    player: state.player.currPlayer,
    isPause: state.player.isPause,
    socket: state.socket.socket
  }));

  const dispatch = useDispatch();

  const onDeleteClick = (event) => {
    dispatch({
      type: "DELETE_VIDEO",
      index: index,
    });
    if (!ReactIsInDevelopmentMode()) {
      socket.emit("delete music", videoId);
    }
  };

  const onVideoItemClick = (event) => {
    dispatch({
      type: "SET_CURR_VIDEO",
      id: videoId,
    });
    dispatch({
      type: "SET_CURR_INDEX",
      index: index,
    });
    player.loadVideoById(videoId);
    if (isPause) {
      dispatch({
        type: "CHANGE_PLAYSTATE",
      });
    }
  };

  return (
    <div className="video-item">
      <div className="vi-item-l" onClick={onVideoItemClick}>
        <span className="vi-index">{index + 1}</span>
        <img
          className="vi-thumbnail"
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt="video thumbnail"
        />
        <span className="vi-title">{title}</span>
      </div>
      <div className="vi-item-r">
        <span className="vi-duration">
          {TimeFormat.fromS(duration ? toSeconds(duration) : 0, "mm:ss")}
        </span>
        <button className="delete-btn" onClick={onDeleteClick}>
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  );
};


export default VideoItem;
