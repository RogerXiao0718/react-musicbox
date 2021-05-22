import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { KEY } from "../../apis/youtubeApi";
import { parse } from "iso8601-duration";

import VideoItem from "../VideoItem";

import "./styles.css";

const VideoList = () => {
  const { currPlayList } = useSelector((state) => ({
    currPlayList: state.player.currPlayList,
  }));

  const [videoInformations, setVideoInformations] = useState([]);

  useEffect(() => {
    const ids = currPlayList.join(",");
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet, contentDetails&id=${ids}&key=${KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setVideoInformations(
            data.items.map((item) => {
              return {
                title: item.snippet.title,
                duration: parse(item.contentDetails.duration),
              };
            })
          );
        }
      });
  }, [currPlayList]);

  return (
    <div className="video-list">
      {videoInformations &&
        videoInformations.map((video, index) => (
          <VideoItem
            index={index}
            videoId={currPlayList[index]}
            title={video.title}
            duration={video.duration}
            key={index}
          ></VideoItem>
        ))}
    </div>
  );
};

export default VideoList;
