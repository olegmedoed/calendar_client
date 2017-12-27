import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { addEvent } from "../actions/events";
import AddEventForm from "./forms/AddEventForm";

class UserPage extends React.Component {
  handleNewEvent = async data => {
    if (this.props.events.find(e => e.title === data.title)) {
      throw new Error("Event with such title already exists");
    }
    return this.props.addEvent(data);
  };

  render() {
    return (
      <div>
        <AddEventForm submit={this.handleNewEvent} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  };
}

export default connect(mapStateToProps, { addEvent })(UserPage);
