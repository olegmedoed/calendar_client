import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { BEGINNING, HALF_DAY, WORK_DURATION } from "../utils/time";
import TimeRange from "./TimeRange";
import EventList from "./EventList";

import { loadEvents } from "../actions/events";

class CalendarView extends React.Component {
  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    const { events } = this.props;
    const evs = [...events].sort((a, b) => a.start - b.start);
    const mid = evs.findIndex(e => e.start > WORK_DURATION / 2);

    let leftEvs, rightEvs;
    if (mid === -1) {
      leftEvs = evs;
      rightEvs = [];
    } else {
      leftEvs = events.slice(0, mid);
      rightEvs = events.slice(mid, events.length);
    }

    return (
      <div className="CalendarView">
        <div className="HalfCalendarView">
          <TimeRange time_range={[...getTimeRange(BEGINNING, HALF_DAY + 30)]} />
          <EventList time_offset={0} events={leftEvs} width={400} />
        </div>
        <div className="HalfCalendarView">
          <TimeRange
            time_range={[
              ...getTimeRange(HALF_DAY + 30, BEGINNING + WORK_DURATION)
            ]}
          />
          <EventList
            time_offset={WORK_DURATION / 2}
            events={rightEvs}
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

export default connect(mapStateToProps, { loadEvents })(CalendarView);
