import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

function UserInfo({ name }) {
  return <div className="UserInfo">{name}</div>;
}

function mapStateToProps(state) {
  return {
    name: state.user.name
  };
}

export default connect(mapStateToProps)(UserInfo);
