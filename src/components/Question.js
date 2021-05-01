import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { formatQuestionView } from '../utils/_DATA'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Question extends Component {

  handleViewPoll = (e, id) => {
    e.preventDefault();
    
    this.props.history.push(`/questions/${id}`)
  };

    render() {

        const { question } = this.props;
        debugger 
        
        if (question === null) {
          return <Redirect to="/404" />;
        }
    
        const {
          id,
          name,
          avatar,
          optionOne,
        } = question;

        return (
              <Card>
                <Card.Header as="h5">{name} Asks:</Card.Header>
                <Card.Body>
                <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
                  <Card.Title style={{fontWeight: "700"}}>Would You Rather</Card.Title>
                  <Card.Text>
                    ...{optionOne.text}...
                  </Card.Text>
                  <Button variant="primary" onClick={(e) => this.handleViewPoll(e, id)}>View Poll</Button>
                </Card.Body>
              </Card>
          );
    }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  debugger
    const question = questions[id];

  
    return {
      authedUser,
      question: question? formatQuestionView(question, users[question.author]): null,
    }
}

export default withRouter(connect(mapStateToProps)(Question))