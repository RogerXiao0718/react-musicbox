import React from "react";

import PlayListHeader from "../PlayListHeader";
import VideoList from "../VideoList";

import "./styles.css";

const MainSection = props => {
  return (
    <div className="main-section">
      <PlayListHeader />
      <VideoList />
    </div>
  );
};

export default MainSection;
