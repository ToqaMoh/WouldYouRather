import React, { Component } from 'react'
import { connect } from "react-redux"
import { formatQuestionView } from '../utils/_DATA'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Question extends Component {
    render() {

        const { question } = this.props;

        if (question === null) {
          return <p>This Question Doesn't Exist!</p>;
        }
    
        const {
          name,
          avatar,
          optionOne,
        } = question;

        return (
            <div>
              <Card>
                <Card.Header as="h5">{name} Asks:</Card.Header>
                <Card.Body>
                <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
                  <Card.Title style={{fontWeight: "700"}}>Would You Rather</Card.Title>
                  <Card.Text>
                    ...{optionOne.text}...
                  </Card.Text>
                  <Button variant="primary">View Poll</Button>
                </Card.Body>
              </Card>
            </div>
          );
    }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
    const question = questions[id];
  
    return {
      authedUser,
      question: question? formatQuestionView(question, users[question.author]): null,
    }
}

export default connect(mapStateToProps)(Question)