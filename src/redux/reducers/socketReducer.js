
const initialState = {
    socket: null
};

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
