import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import '../App.css';
import Dashboard from "./Dashboard"
import Login from "./Login"

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
    <div className="App">
      <Dashboard />
      {/* <Login /> */}
    </div>
    )
  }
}

// function mapStateToProps({ authedUser }) {
//   return {
//     loading: authedUser === null,
//   };
// }

export default connect()(App);