import React, { useEffect } from "react";
import { io } from "socket.io-client";

import Header from "../Header";
import SideBar from "../SideBar";
import MainSection from "../MainSection";
import PlayController from "../PlayController";
import "./styles.css";
import { useDispatch } from "react-redux";
import ReactIsInDevelopmentMode from "../../ReactIsInDevelopmentMode";


const App = props => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (!ReactIsInDevelopmentMode()) {
      const socket = io("localhost:4000");
      dispatch({
        type: "SET_SOCKET",
        socket: socket
      });
    }
  }, []);

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
