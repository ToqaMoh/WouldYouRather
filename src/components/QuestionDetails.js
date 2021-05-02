import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { handleAnswerQuestion } from "../actions/shared";

class QuestionDetails extends Component {
  state = {
    selectedAnswer: "",
  };

  handleChange = (e) => {
    this.setState(() => ({
      selectedAnswer: e.target.id,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { selectedAnswer } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAnswerQuestion(id, selectedAnswer));

    this.setState(() => ({
      selectedAnswer: "",
    }));
  };

  render() {
    const {
      fakeQuestion,
      name,
      avatarURL,
      answer,
      optionOne,
      optionTwo,
      optionOneVotes,
      optionTwoVotes,
      noOfVotes,
      optionOneVotesPercent,
      optionTwoVotesPercent,
    } = this.props;
    const { selectedAnswer } = this.state;

    if (fakeQuestion === true) {
      return <Redirect to="/404" />;
    }

    return (
      <div style={{ padding: "35px 390px" }}>
        <Card>
          <Card.Header as="h5">{name} Asks:</Card.Header>
          <Card.Body>
            <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
            <Card.Title style={{ fontWeight: "700" }}>
              Would You Rather
            </Card.Title>
            {answer ? (
              <div>
                <Card>
                  {answer === "optionOne" && (
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
                  {answer === "optionTwo" && (
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
              </div>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <Form.Check
                  type="radio"
                  name="radioGp"
                  id="optionOne"
                  label={optionOne}
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  name="radioGp"
                  id="optionTwo"
                  label={optionTwo}
                  onChange={this.handleChange}
                />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={selectedAnswer === ""}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { question_id } = props.match.params;
  const question = questions[question_id];
  const fakeQuestion =
    question && question.fakeQuestion ? question.fakeQuestion : false;
  const user = question ? users[question.author] : null;
  const answers =
    Object.keys(users).length === 0 ? null : users[authedUser].answers;

  var answer = null;
  if (answers) {
    if (answers.hasOwnProperty(question_id)) {
      answer = answers[question_id];
    }
  }

  const optionOneVotes = question ? question.optionOne.votes.length : null;
  const optionTwoVotes = question ? question.optionTwo.votes.length : null;
  const noOfVotes = optionOneVotes + optionTwoVotes;
  const optionOneVotesPercent = parseFloat((optionOneVotes / noOfVotes) * 100);
  const optionTwoVotesPercent = parseFloat((optionTwoVotes / noOfVotes) * 100);

  return {
    id: question_id,
    fakeQuestion,
    name: user ? user.name : null,
    avatarURL: user ? user.avatarURL : null,
    answer,
    optionOne: question ? question.optionOne.text : null,
    optionTwo: question ? question.optionTwo.text : null,
    optionOneVotes,
    optionTwoVotes,
    noOfVotes,
    optionOneVotesPercent,
    optionTwoVotesPercent,
  };
}

export default connect(mapStateToProps)(QuestionDetails);
