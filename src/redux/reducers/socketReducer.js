//This is the initial global state of player
const initialState = {
    socket: null
};

//Define playerReducer for redux store
const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SOCKET":
            return {
                ...state,
                socket: action.socket
            };
        default:
            console.log(`Undefined action type ${action.type}`);
            return state;
    }
};

export default socketReducer;
