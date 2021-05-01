import React, { Component } from "react";
import { connect } from "react-redux";
import AnswerQuestion from './AnswerQuestion';
import QuestionResult from './QuestionResult';
import NotFound404 from './NotFound404';

class QuestionPage extends Component {
  render() {
      debugger
    const { isAnswered, isSaved, question } = this.props;
    const { id } = question;
    return (
        <div>
            {!isAnswered && isSaved.length > 0 && (
                <AnswerQuestion id={id}/>
            )}

            {!isAnswered && isSaved.length === 0 && (
                <NotFound404 />
            )}

            {isAnswered && (
                <QuestionResult id={id}/>
            )}
        </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
    debugger
  const { id } = props.match.params;
  const question = questions[id];
  const user = users[authedUser];
  const answeredQuestionsIds = user ? Object.keys(user.answers) : null;
  const isAnswered = answeredQuestionsIds.includes(id);
  const isSaved = users[question.author].questions.filter((qid) => qid === question.id);

  return {
    authedUser,
    question: question,
    isAnswered,
    isSaved
  };
}

export default connect(mapStateToProps)(QuestionPage);
