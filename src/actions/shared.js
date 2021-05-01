import { getInitialData } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAutherUser } from "./authedUser";
import { showLoading, hideLoading } from 'react-redux-loading';

var AUTHED_ID = localStorage.getItem("authedUser");
if(AUTHED_ID === null) {
  AUTHED_ID = '';
}

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
        dispatch(setAutherUser(AUTHED_ID))
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
    });
  };
}
