import { getInitialData } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAutherUser } from "./authedUser";

const AUTHED_ID = 'tylermcginnis';

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
        dispatch(setAutherUser(AUTHED_ID))
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
    });
  };
}
