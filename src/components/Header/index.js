import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "./mb-logo-140.png";
import "./styles.css";

const HeaderBase = ({ dispatch }) => {
  const [addVideoId, setAddVideoId] = useState("");
  const [isSearchAppend, setSearchAppend] = useState(false);

  const isInputValid = addVideoId.trim() !== "";

  const onAddInputChange = event => {
    setAddVideoId(event.target.value);
  };

  const onAddVideoClick = event => {
    dispatch({
      type: "ADD_VIDEO",
      videoId: addVideoId
    });
    event.preventDefault();
  };

  const onSmallSearchClick = event => {
    setSearchAppend(!isSearchAppend);
  };

  return (
    <header className="header">
      <Link className="logo" to="/">
        <img src={logo} alt="logo" />
      </Link>
      {/* <form className="search-form">
        <i className="fas fa-search" />
        <input
          className={searchBoxClasses}
          onFocus={searchOnFocus}
          onBlur={searchWithoutFocus}
          type="text"
          placeholder="搜尋音樂"
        />
        <button className="search-btn" type="submit">
          搜尋
        </button>
      </form> */}
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
          style={{ display: isSearchAppend ? "block" : "none" }}
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

const Header = connect(
  null,
  null
)(HeaderBase);

export default Header;
