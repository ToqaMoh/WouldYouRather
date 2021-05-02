import { getInitialData, _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { receiveUsers, userAddQuestion, userSaveAnswer } from "./users";
import { receiveQuestions, addQuestion, answerQuestion } from "./questions";
import { setAutherUser } from "./authedUser";
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = '';

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

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(userAddQuestion(authedUser, question.id));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() => {
        dispatch(answerQuestion(authedUser, qid, answer));
        dispatch(userSaveAnswer(authedUser, qid, answer))
      })
      .then(() => dispatch(hideLoading()));
  };
}