import React from "react";
import { useSelector } from "react-redux";

import VideoItem from "../VideoItem";

import "./styles.css";

const VideoList = () => {
  const { currPlayList } = useSelector((state) => ({
    currPlayList: state.player.currPlayList,
  }));
  return (
    <div className="video-list">
      {currPlayList.map((videoId, index) => (
        <VideoItem index={index} videoId={videoId} key={index} />
      ))}
    </div>
  );
};

export default VideoList;
