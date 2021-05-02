import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Question extends Component {
  handleViewPoll = (e, id) => {
    e.preventDefault();

    this.props.history.push(`/questions/${id}`);
  };

  render() {
    const { question, user } = this.props;

    const { id, optionOne } = question;

    const { name, avatarURL } = user;

    return (
      <Card>
        <Card.Header as="h5">{name} Asks:</Card.Header>
        <Card.Body>
          <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          <Card.Title style={{ fontWeight: "700" }}>
            Would You Rather
          </Card.Title>
          <Card.Text>...{optionOne.text}...</Card.Text>
          <Button variant="primary" onClick={(e) => this.handleViewPoll(e, id)}>
            View Poll
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const user = users[question.author];

  return {
    authedUser,
    question: question ? question : null,
    user: user ? user : null,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
