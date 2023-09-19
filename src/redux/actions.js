export const SET_USER = 'SET_USER';
export const SET_USER_ID = 'SET_USER_ID';

export const setUser = user => dispatch => {
    dispatch({
        type: SET_USER,
        payload: user,
    })
};

export const setUserId = userId => dispatch => {
    dispatch({
        type: SET_USER_ID,
        payload: userId,
    })
};
