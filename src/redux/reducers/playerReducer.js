//This is the initial playlist
const initialPlayList = [
  "XSLhsjepelI",
  "iOcE1v1cy2A",
  "JPhEkto2YV8",
  "f1RLl45ZWIY",
];

//This is the initial global state of player
const initialState = {
  currPlayList: initialPlayList,
  currVideoId: initialPlayList[0],
  currVideoTitle: "",
  currDuration: "",
  currTimeInSeconds: 0,
  currPlayState: "play",
  currPlayer: null,
  currIndex: 0,
  isPause: true,
  playMode: "normal"
};

//Define playerReducer for redux store
const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURR_VIDEO":
      return {
        ...state,
        currVideoId: action.id,
        currTimeInSeconds: 0,
      };
    case "SET_CURR_PLAYER":
      return {
        ...state,
        currPlayer: action.newPlayer,
      };
    case "SET_CURR_TITLE":
      return {
        ...state,
        currVideoTitle: action.currVideoTitle,
      };
    case "SET_CURR_DURATION":
      return {
        ...state,
        currDuration: action.currDuration,
      };
    case "INCREASE_CURR_TIME":
      return {
        ...state,
        currTimeInSeconds: state.currTimeInSeconds + 1,
      };
    case "CHANGE_PLAYSTATE":
      const newIsPause = !state.isPause;
      if (newIsPause) state.currPlayer.pauseVideo();
      else state.currPlayer.playVideo();
      return {
        ...state,
        isPause: newIsPause,
      };
    case "SET_CURR_INDEX":
      return {
        ...state,
        currIndex: action.index,
      };
    case "ADD_VIDEO":
      return {
        ...state,
        currPlayList: [action.videoId, ...state.currPlayList],
      };
    case "DELETE_VIDEO":
      return {
        ...state,
        currPlayList: state.currPlayList.filter(
          (videoId, index) => index !== action.index
        ),
      };
    case "CURR_TIME_TO_ZERO":
      return {
        ...state,
        currTimeInSeconds: 0,
      };
    case "CHANGE_PLAY_MODE":
      return {
        ...state,
        playMode: action.newPlayMode
      };
    default:
      console.log(`Undefined action type ${action.type}`);
      return state;
  }
};

export default playerReducer;
