import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function Guest({ isAuthenticated, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/user" />
      }
    />
  );
}

Guest.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(Guest, undefined, undefined, {
  pure: false
});
