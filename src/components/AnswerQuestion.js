import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { formatQuestionView } from "../utils/_DATA";
import { handleAnswerQuestion } from "../actions/questions";

class AnswerQuestion extends Component {
  state = {
    answer: "",
  };

  handleChange = (e) => {
    this.setState(() => ({
      answer: e.target.id,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { answer } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAnswerQuestion(id, answer));

    this.setState(() => ({
      answer: "",
    }));
  };

  render() {
      debugger
    const { id, question } = this.props;
    const { answer } = this.state;

    if (question === null) {
        return <Redirect to={`/questions/:${id}%`} />
    }

    const { name, avatar, optionOne, optionTwo } = question;

    return (
      <div style={{ padding: "35px 390px" }}>
        <Card>
          <Card.Header as="h5">{name} Asks:</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
              <Card.Title style={{ fontWeight: "700" }}>
                Would You Rather
              </Card.Title>
                <Form.Check
                  type="radio"
                  id="optionOne"
                  label={optionOne.text}
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  id="optionTwo"
                  label={optionTwo.text}
                  onChange={this.handleChange}
                />
              <Button variant="primary" type="submit" disabled={answer === ""}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
    debugger
  const question = questions[id];
//   const paramId = props.match.params;

  return {
    id,
    question: question
      ? formatQuestionView(question, users[question.author])
      : null,
  };
}

export default withRouter(connect(mapStateToProps)(AnswerQuestion));
