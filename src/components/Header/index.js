import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ReactIsInDevelopmentMode from "../../ReactIsInDevelopmentMode";

import "./styles.css";

const Header = () => {
  const [addVideoId, setAddVideoId] = useState("");
  const [isSearchExpand, setIsSearchExpand] = useState(false);
  const { socket } = useSelector(state => ({
    socket: state.socket.socket
  }));


  const isInputValid = addVideoId.trim() !== "";
  const dispatch = useDispatch();

  const onAddInputChange = (event) => {
    setAddVideoId(event.target.value);
  };

  const onAddVideoClick = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_VIDEO",
      videoId: addVideoId,
    });
    if (!ReactIsInDevelopmentMode()) {
      socket.emit("add music", addVideoId);
    }
  };

  const onSmallSearchClick = (event) => {
    setIsSearchExpand(!isSearchExpand);
  };

  return (
    <header className="header">
      <Link className="logo" to="/">
        <h1>RogerBox</h1>
      </Link>
      <form className="add-v-form">
        <i className="fas fa-search" />
        <input
          className="add-v-box"
          type="text"
          value={addVideoId}
          onChange={onAddInputChange}
          placeholder="加入歌曲"
        />
        <button
          className="add-v-btn"
          disabled={!isInputValid}
          type="submit"
          onClick={onAddVideoClick}
        >
          加入
        </button>
      </form>
      <div className="social-link">
        <a
          href="https://twitter.com/RogerXiao5"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fab fa-twitter" />
          <span>Made By RogerXiao</span>
        </a>
      </div>
      <div className="lsb-container">
        <button className="little-search-btn" onClick={onSmallSearchClick}>
          <i className="fas fa-search" />
        </button>
        <div
          className="apd-search-section"
          style={{ display: isSearchExpand ? "block" : "none" }}
        >
          <form className="apd-search-form">
            <input
              className="apd-search-box"
              type="text"
              onChange={onAddInputChange}
              value={addVideoId}
              placeholder="加入歌曲"
            />
            <button
              className="apd-search-btn"
              type="submit"
              onClick={onAddVideoClick}
            >
              <i className="fas fa-plus"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
