export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAutherUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function handleSetAutherUser(userId) {
    return (dispatch) => {
        return dispatch(setAutherUser(userId))
    };
}