import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { handleSetAutherUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    selectedUser: "",
  };

  handleChange = (e) => {
    const selectedUser = e.target.value;

    this.setState(() => ({
      selectedUser,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { selectedUser } = this.state;
    const { dispatch } = this.props;

    dispatch(handleSetAutherUser(selectedUser));

    localStorage.setItem("authedUser", selectedUser);

    this.setState(() => ({
      selectedUser: "",
    }));

    this.props.history.push(`/`)
  };

  render() {
    const { users } = this.props;
    const { selectedUser } = this.state;

    return (
      <div style={{ padding: "35px 390px" }}>
        <Card border="primary">
          <Card.Header as="h5">
            Welcome to the Would You Rather App!
          </Card.Header>
          <Card.Header as="h6">Please Sign In to Continue</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Sign In</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedUser}
                  onChange={this.handleChange}
                >
                  <option>
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={selectedUser === ""}
              >
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: users ? Object.values(users) : [],
  };
}

export default withRouter(connect(mapStateToProps)(Login));
