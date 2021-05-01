import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { formatQuestionView } from "../utils/_DATA";

class QuestionResult extends Component {
  render() {
    const {
      question,
      user,
      optionOneVotes,
      optionTwoVotes,
      noOfVotes,
      optionOneVotesPercent,
      optionTwoVotesPercent,
      UserAnswer
    } = this.props;
    const { optionOne, optionTwo } = question;
    const { name, avatarURL } = user;

    return (
      <div style={{ padding: "35px 390px" }}>
        <Card>
          <Card.Header as="h5">{name} Asks:</Card.Header>
          <Card.Body>
            <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
            <Card.Title style={{ fontWeight: "700" }}>Results:</Card.Title>
            <Card>
              {UserAnswer === "optionOne" && (
                <div style={{ textAlign: "right", padding: "2px 10px" }}>
                  <Badge pill variant="warning">
                    Your Vote
                  </Badge>
                </div>
              )}
              <Card.Body>
                <Card.Text>{optionOne.text}</Card.Text>
                <ProgressBar
                  animated
                  now={optionOneVotesPercent}
                  label={`${optionOneVotesPercent}%`}
                />
                <Card.Text>
                  {optionOneVotes} out of {noOfVotes} Votes
                </Card.Text>
              </Card.Body>
            </Card>
            <Dropdown.Divider />
            <Card>
              {UserAnswer === "optionTwo" && (
                <div style={{ textAlign: "right", padding: "2px 10px" }}>
                  <Badge pill variant="warning">
                    Your Vote
                  </Badge>
                </div>
              )}
              <Card.Body>
                <Card.Text>{optionTwo.text}</Card.Text>
                <ProgressBar
                  animated
                  now={optionTwoVotesPercent}
                  label={`${optionTwoVotesPercent}%`}
                />
                <Card.Text>
                  {optionTwoVotes} out of {noOfVotes} Votes
                </Card.Text>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const userData = users[question.author];
  const user = users[authedUser];
  const UserAnswer = user.answers[id];
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const noOfVotes = optionOneVotes + optionTwoVotes;
  const optionOneVotesPercent = parseFloat((optionOneVotes / noOfVotes) * 100);
  const optionTwoVotesPercent = parseFloat((optionTwoVotes / noOfVotes) * 100);

  return {
    id,
    question,
    user: userData,
    optionOneVotes,
    optionTwoVotes,
    noOfVotes,
    optionOneVotesPercent,
    optionTwoVotesPercent,
    UserAnswer,
  };
}
export default connect(mapStateToProps)(QuestionResult);
