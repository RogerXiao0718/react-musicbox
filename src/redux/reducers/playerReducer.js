const initialPlayList = [
  "GhrRvZOcdYE",
  "SX_ViT4Ra7k",
  "Xm5eJum2ESI",
  "s7fTnIE2YTo",
  "m8M4OkfBsA8",
  "uVeSf_vIeAE"
];

const initialState = {
  currPlayList: initialPlayList,
  currVideoId: initialPlayList[0],
  currVideoTitle: "",
  currDuration: "",
  currTimeInSeconds: 0,
  currPlayState: "play",
  currPlayer: null,
  currIndex: 0,
  isPause: true
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURR_VIDEO":
      return {
        ...state,
        currVideoId: action.id,
        currTimeInSeconds: 0
      };
    case "SET_CURR_PLAYER":
      return {
        ...state,
        currPlayer: action.newPlayer
      };
    case "SET_CURR_TITLE":
      return {
        ...state,
        currVideoTitle: action.currVideoTitle
      };
    case "SET_CURR_DURATION":
      return {
        ...state,
        currDuration: action.currDuration
      };
    case "INCREASE_CURR_TIME":
      return {
        ...state,
        currTimeInSeconds: state.currTimeInSeconds + 1
      };
    case "CHANGE_PLAYSTATE":
      return {
        ...state,
        isPause: !state.isPause
      };
    case "SET_CURR_INDEX":
      return {
        ...state,
        currIndex: action.index
      };
    case "ADD_VIDEO":
      return {
        ...state,
        currPlayList: [action.videoId, ...state.currPlayList]
      };
    case "DELETE_VIDEO":
      return {
        ...state,
        currPlayList: state.currPlayList.filter(
          (videoId, index) => index !== action.index
        )
      };
    case "CURR_TIME_TO_ZERO":
      return {
        ...state,
        currTimeInSeconds: 0
      };
    case "UPDATE_CURRENT_TIME":
      return {
        ...state,
        currTimeInSeconds: Math.floor(state.currPlayer.getCurrentTime())
      };
    case "CHANGE_CURRENT_TIME":
      return {
        ...state,
        currTimeInSeconds: action.value
      };
    default:
      return state;
  }
};

export default playerReducer;
