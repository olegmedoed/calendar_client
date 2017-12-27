import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { logout } from "../actions/auth";

function LogOut({ logout }) {
  return (
    <button className="Btn" type="button" onClick={logout}>
      Log Out
    </button>
  );
}

export default connect(undefined, { logout })(LogOut);
