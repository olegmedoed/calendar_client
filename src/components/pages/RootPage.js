import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { signup } from "../../actions/user";
import { login } from "../../actions/auth";

import SignUpForm from "../forms/SignUpForm";
import LogInForm from "../forms/LogInForm";

function RootPage({ signup, login }) {
  return (
    <div id="root_page">
      <div className="Auth">
        <LogInForm submit={login} />
        <SignUpForm submit={signup} />
      </div>
    </div>
  );
}

RootPage.propTypes = {
  signup: PropTypes.func.isRequired
};

export default connect(undefined, { signup, login })(RootPage);
