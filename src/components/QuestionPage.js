import React, { Component } from "react";
import { connect } from "react-redux";
import AnswerQuestion from "./AnswerQuestion";
import QuestionResult from "./QuestionResult";
import NotFound404 from "./NotFound404";

class QuestionPage extends Component {
  render() {
    debugger;
    const { id, isAnswered, isSaved, question } = this.props;

    return (
      <div>
        {!isAnswered && isSaved.length > 0 && <AnswerQuestion id={id} />}

        {!isAnswered && isSaved.length === 0 && <NotFound404 />}

        {isAnswered && <QuestionResult id={id} />}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  debugger;
  const { question_id } = props.match.params;
  var question = Object.keys(questions).length === 0 ? null : questions[question_id];
  if(question === undefined) {
    question = null;
  }
  const user = Object.keys(users).length === 0 ? null : users[authedUser];
  const answeredQuestionsIds = user ? Object.keys(user.answers) : null;
  const isAnswered = answeredQuestionsIds? answeredQuestionsIds.includes(question_id) : false;
  const isSaved = Object.keys(users).length === 0 || question === null ? [] : users[question.author].questions.filter((qid) => qid === question.id);

  return {
    id: question_id,
    authedUser,
    question: question,
    isAnswered,
    isSaved,
  };
}

export default connect(mapStateToProps)(QuestionPage);
