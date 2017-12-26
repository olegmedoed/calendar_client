import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./css/index.css";
import "./css/Forms.css";

import RootPage from "./components/pages/RootPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={RootPage} />
      </div>
    );
  }
}

export default App;
