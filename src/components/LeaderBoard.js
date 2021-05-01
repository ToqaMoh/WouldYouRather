import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Button from 'react-bootstrap/Button';

class LeaderBoard extends Component {

  render() {

    const { users, usersList } = this.props;


    return (
      <div style={{ padding: "35px 390px" }}>
          <ul>
              {usersList.map((id) => (
                <li key={id}>
                   <Card>
                <Card.Header as="h2">{users[id].name}</Card.Header>
                <Card.Body>
                <img src={users[id].avatarURL} alt={`Avatar of ${users[id].name}`} className="avatar" />
                  <Card.Title style={{fontWeight: "700"}}>Would You Rather</Card.Title>
                  <Card.Text>
                   Answered Questions: {Object.keys(users[id].answers).length}
                  </Card.Text>
                  <Dropdown.Divider />
                  <Card.Text>
                   Created Questions: {users[id].questions.length}
                  </Card.Text>
                  <Dropdown.Divider />
                  <Card.Text>
                   Score: 
                   <Button variant="success">{(Object.keys(users[id].answers).length + users[id].questions.length)}</Button>
                </Card.Text>
                </Card.Body>
              </Card>
                </li>
              ))}
            </ul>
       
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const usersList = users
    ? Object.keys(users).sort(
        (a, b) =>
          (Object.keys(users[b].answers).length + users[b].questions.length) -
          (Object.keys(users[a].answers).length + users[a].questions.length)
      )
    : null;

  return {
    users,
    usersList: usersList,
  };
}
export default connect(mapStateToProps)(LeaderBoard);
