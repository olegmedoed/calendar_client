import PropTypes from "prop-types";
import React from "react";

import Sorter from "../utils/sorter";

export default class EventList extends React.Component {
  clickCross = e => {
    const value = e.target.nextSibling.textContent;
    this.props.click_cross(value);
  };

  render() {
    const { events, width, time_offset } = this.props;
    events.sort((a, b) => a.start - b.start);
    const sorter = new Sorter();
    events.forEach(e => sorter.addEvent2(e));

    let finalList = sorter.elements();
    finalList = finalList.map((ev, i) => {
      const w = width * (ev.width / sorter.length);
      const off = ev.offset * w;
      return (
        <div
          key={i}
          className="Event"
          style={{
            position: "absolute",
            top: (ev.start - time_offset) * 2,
            height: ev.duration * 2,
            width: w,
            left: off
          }}
        >
          <div className="EventClose" onClick={this.clickCross}>
            x
          </div>
          <div className="EventContent">{ev.title}</div>
        </div>
      );
    });

    return (
      <div className="EventList" style={{ width }}>
        {finalList}
      </div>
    );
  }
}
