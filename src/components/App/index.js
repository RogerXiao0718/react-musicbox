import React from "react";

import Header from "../Header";
import SideBar from "../SideBar";
import MainSection from "../MainSection";
import PlayController from "../PlayController";
import "./styles.css";

const App = props => {
  return (
    <div className="page-container">
      <Header />
      <SideBar />
      <MainSection />
      <PlayController />
    </div>
  );
};

export default App;
