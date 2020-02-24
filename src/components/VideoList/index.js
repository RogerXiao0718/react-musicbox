import React from "react";
import { connect } from "react-redux";

import VideoItem from "../VideoItem";

import "./styles.css";

const VideoListBase = ({ currPlayList }) => {
  return (
    <div className="video-list">
      {currPlayList.map((videoId, index) => (
        <VideoItem index={index} videoId={videoId} />
      ))}
    </div>
  );
};

const VideoList = connect(state => ({
  currPlayList: state.player.currPlayList
}))(VideoListBase);

export default VideoList;
