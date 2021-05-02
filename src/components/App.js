import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import "../App.css";
import Login from "./Login";
import NavComponent from "./NavComponent";
import Dashboard from "./Dashboard";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import LeaderBoard from './LeaderBoard';
import NotFound404 from './NotFound404';
import LoadingBar from "react-redux-loading";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { user } = this.props;
    return (
      <Router>
        <Fragment>
          <NavComponent user={user} />
          <LoadingBar />
          <div className="App">
            {this.props.authedUser === "" ? ( 
              <div>
                <Route path="/" component={Login} />
              </div>
            ) : (
              <div>
                {this.props.loading === true ? null : (
                  <div>
                    <div>
                      <Route path="/" exact component={Dashboard} />
                      <Route path="/add" component={NewQuestion} />
                      <Route path="/leaderboard" component={LeaderBoard} />
                      <Route path="/questions/:question_id" component={QuestionPage} />
                      <Route path="/404" exact component={NotFound404} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser];

  return {
    authedUser,
    user,
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
