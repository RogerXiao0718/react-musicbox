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

      socket.on("add music", (musicId) => {
        dispatch({
          type: "ADD_VIDEO",
          videoId: musicId,
        });
      });

      socket.on("delete music", (musicId) => {
        dispatch({
          type: "DELETE_VIDEO_BY_ID",
          videoId: musicId,
        });
      });

      dispatch({
        type: "SET_SOCKET",
        socket: socket
      });
    }
  }, [dispatch]);

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
