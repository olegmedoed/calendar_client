import PropTypes from "prop-types";
import React from "react";

import AddEvent from "../AddEvent";
import UserInfo from "../UserInfo";

import CalendarView from "../CalendarView";

export default class UserPage extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="UserPage">
        <div className="UserSideBar">
          <UserInfo />
          <AddEvent />
        </div>
        <CalendarView />
      </div>
    );
  }
}
