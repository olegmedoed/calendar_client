import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { signup } from "../../actions/user";

import SignUpForm from "../forms/SignUpForm";

function RootPage({ signup }) {
  return (
    <div id="root_page">
      <div className="Auth">
        <SignUpForm submit={signup} />
      </div>
    </div>
  );
}

RootPage.propTypes = {
  signup: PropTypes.func.isRequired
};

export default connect(undefined, { signup })(RootPage);
