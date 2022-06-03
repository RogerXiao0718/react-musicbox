import React, { useState } from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";

import "./styles.css";

const PlayListHeader = () => {
  const [isRandomChecked, setRandomChecked] = useState(false);
  const [isLoopChecked, setLoopChecked] = useState(false);

  const { currPlayList } = useSelector((state) => {
    return {
      currPlayList: state.player.currPlayList,
    };
  });

  const ranClasses = classnames({
    "play-state-ctrl": true,
    "ctrl-checked": isRandomChecked,
  });
  const loopClasses = classnames({
    "play-state-ctrl": true,
    "ctrl-checked": isLoopChecked,
  });

  const onRandomClick = () => {
    setRandomChecked(!isRandomChecked);
  };
  const onLoopClick = () => {
    setLoopChecked(!isLoopChecked);
  };

  return (
    <div className="play-list-header">
      <img
        className="list-thumbnail"
        src="https://i.ytimg.com/vi/rvC3j1ow32g/hqdefault.jpg"
        alt="play list thumbnail"
      />
      <div className="list-header-r">
        <span className="play-list-name">List Name</span>
        <span className="list-detail">{`${currPlayList.length} 首歌 - 來自 XXX`}</span>
        <div className="header-ctrls">
          <button className="play-state-ctrl del-ctrl">刪除</button>
          <button className={ranClasses} onClick={onRandomClick}>
            隨機撥放
          </button>
          <button className={loopClasses} onClick={onLoopClick}>
            單曲重複
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayListHeader;
