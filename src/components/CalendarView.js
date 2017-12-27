import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { BEGINNING, HALF_DAY, WORK_DURATION } from "../utils/time";
import TimeRange from "./TimeRange";
import EventList from "./EventList";

import { loadEvents, removeEvent } from "../actions/events";

class CalendarView extends React.Component {
  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    const { events } = this.props;

    const leftEvs = events.filter(e => e.start <= WORK_DURATION / 2);
    const rightEvs = events.filter(e => e.start > WORK_DURATION / 2);

    return (
      <div className="CalendarView">
        <div className="HalfCalendarView">
          <TimeRange time_range={[...getTimeRange(BEGINNING, HALF_DAY + 30)]} />
          <EventList
            time_offset={0}
            events={leftEvs}
            width={400}
            click_cross={this.props.removeEvent}
          />
        </div>
        <div className="HalfCalendarView">
          <TimeRange
            time_range={[
              ...getTimeRange(HALF_DAY + 30, BEGINNING + WORK_DURATION)
            ]}
          />
          <EventList
            time_offset={WORK_DURATION / 2 + 30}
            events={rightEvs}
            click_cross={this.props.removeEvent}
            width={400}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  };
}

function* getTimeRange(start, end) {
  while (start <= end) {
    yield start;
    start += 30;
  }
}

export default connect(mapStateToProps, { loadEvents, removeEvent })(
  CalendarView
);
