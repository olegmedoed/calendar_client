import PropTypes from "prop-types";
import React from "react";

import { numberToTimeString } from "../utils/time";

export default function TimeRange({ time_range }) {
  return (
    <div className="TimeRange">
      {time_range.map(
        time =>
          time % 60 === 0 ? (
            <div key={time} className="HourTime">
              {numberToTimeString(time)}
            </div>
          ) : (
            <div key={time} className="HalfHourTime">
              {numberToTimeString(time)}
            </div>
          )
      )}
    </div>
  );
}
