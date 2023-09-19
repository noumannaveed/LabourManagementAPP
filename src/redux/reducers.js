import { SET_USER } from "./actions";
import { SET_USER_ID } from "./actions";

const initialState = {
    user: null,
    userId: null,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_USER_ID:
            return { ...state, userId: action.payload };
        default:
            return state;
    }
}

export default userReducer;