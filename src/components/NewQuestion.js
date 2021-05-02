import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleChange = (e) => {
    this.setState(() => ({
      [e.target.id]: e.target.value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div style={{ padding: "35px 390px" }}>
        <Card>
          <Card.Header as="h2">Create A New Question</Card.Header>
          <Card.Body>
            <Card.Title>Complete The Question:</Card.Title>
            <Card.Title style={{ fontWeight: "700" }}>
              Would You Rather...
            </Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Option One"
                  id="optionOneText"
                  value={optionOneText}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Dropdown.Divider /> OR <Dropdown.Divider />
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Option Two"
                  id="optionTwoText"
                  value={optionTwoText}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={optionOneText === "" || optionTwoText === ""}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default connect()(NewQuestion);
