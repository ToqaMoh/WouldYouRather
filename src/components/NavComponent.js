import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { handleSetAutherUser } from "../actions/authedUser";

class NavComponent extends Component {

  handleLogout = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(handleSetAutherUser(""));
    localStorage.clear();
    this.props.history.push(`/`)
  };

  render() {
    const { authedUser, user } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Nav variant="pills" activeKey={window.location.pathname}>
              <Nav.Item>
                <Nav.Link href="/">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/add">
                  New Question
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/leaderboard">
                  Leader Board
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          {authedUser !== "" && user !== null && (
            <Col>
              <Row>
                <Col>
                  Hello, {user.name}
                  <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className="navAvatar"
                  />
                </Col>
                <Col>
                  <Button variant="danger" onClick={(e) => this.handleLogout(e)}>Logout</Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps({ authedUser }, { user }) {
  return {
    authedUser,
    user: user? user: null
  };
}

export default withRouter(connect(mapStateToProps)(NavComponent));
