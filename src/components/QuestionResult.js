import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

class QuestionResult extends Component {
  render() {
    const {
      optionOne, 
      optionTwo,
      name, 
      avatarURL,
      optionOneVotes,
      optionTwoVotes,
      noOfVotes,
      optionOneVotesPercent,
      optionTwoVotesPercent,
      UserAnswer
    } = this.props;

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
                <Card.Text>{optionOne}</Card.Text>
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
                <Card.Text>{optionTwo}</Card.Text>
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
  const question = Object.keys(questions).length === 0 ? null : questions[id];
  const userData = Object.keys(users).length === 0 || question === null? null : users[question.author];
  const user = Object.keys(users).length === 0? null : users[authedUser];
  const UserAnswer =  user? user.answers[id] : null;
  const optionOneVotes = question? question.optionOne.votes.length : null;
  const optionTwoVotes = question? question.optionTwo.votes.length : null;
  const noOfVotes = optionOneVotes + optionTwoVotes;
  const optionOneVotesPercent = parseFloat((optionOneVotes / noOfVotes) * 100);
  const optionTwoVotesPercent = parseFloat((optionTwoVotes / noOfVotes) * 100);

  return {
    question,
    optionOne: question? question.optionOne.text : null, 
    optionTwo: question? question.optionTwo.text : null,
    name: userData? userData.name : null, 
    avatarURL: userData? userData.avatarURL : null,
    optionOneVotes,
    optionTwoVotes,
    noOfVotes,
    optionOneVotesPercent,
    optionTwoVotesPercent,
    UserAnswer,
  };
}
export default connect(mapStateToProps)(QuestionResult);
