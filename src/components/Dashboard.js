import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Question from "./Question";

class Dashboard extends Component {
  render() {

    const { sortedAnsweredQuestionsIds, sortedUnansweredQuestionsIds } = this.props;

    return (
      <div style={{ padding: "35px 340px" }}>
        <Tabs defaultActiveKey="unansweredQuestions">
          <Tab eventKey="unansweredQuestions" title="Unanswered Questions">
            <ul>
            {sortedUnansweredQuestionsIds.map((id) => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))}
            </ul>
          </Tab>
          <Tab eventKey="answeredQuestions" title="Answered Questions">
            <ul>
              {sortedAnsweredQuestionsIds.map((id) => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))}
            </ul>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {

  const user = users[authedUser];
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const answeredQuestionsIds = user ? Object.keys(user.answers) : null;
  const sortedAnsweredQuestionsIds = answeredQuestionsIds? questionIds.filter(function(val) {
    return answeredQuestionsIds.indexOf(val) !== -1;
  }) : [];
  const sortedUnansweredQuestionsIds = answeredQuestionsIds? questionIds.filter(function(val) {
    return answeredQuestionsIds.indexOf(val) === -1;
  }) : [];

  return {
    sortedAnsweredQuestionsIds,
    sortedUnansweredQuestionsIds
  };
}

export default connect(mapStateToProps)(Dashboard);
