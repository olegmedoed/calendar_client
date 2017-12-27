import PropTypes from "prop-types";
import React from "react";

import { timeToNumber, WORK_DURATION } from "../../utils/time";

const EMPTY = {};
const EMPTY_DATA = {
  time: "08:00",
  duration: "1",
  title: ""
};

export default class AddEventForm extends React.Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  state = {
    data: EMPTY_DATA,
    errors: EMPTY
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState(prev => ({
      data: { ...prev.data, [name]: value },
      errors: EMPTY
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    let { time, duration, title } = this.state.data;
    const start = timeToNumber(time);
    duration = duration | 0;
    title = title.trim();

    const data = { start, duration, title };
    const errors = validate(data);

    if (Object.keys(errors).length) {
      return this.setState({ errors });
    }

    this.props.submit(data).catch(e => {
      this.setState({
        data: EMPTY_DATA,
        errors: { global: e.message }
      });
    });
  };

  render() {
    const { data, errors } = this.state;
    const errorKeys = Object.keys(errors);

    return (
      <div>
        {errorKeys.length > 0 && (
          <div className="FormMsg FormError">
            {errorKeys.map(key => <div key={key}>{errors[key]}</div>)}
          </div>
        )}
        <form className="FormBody" onSubmit={this.onSubmit}>
          <div className="FormElement">
            <label htmlFor="add_event_time">Start at:</label>
            <input
              id="add_event_time"
              type="time"
              name="time"
              value={data.time}
              min="08:00"
              max="17:00"
              required={true}
              onChange={this.onChange}
            />
          </div>
          <div className="FormElement">
            <label htmlFor="add_event_duration">Duration:</label>
            <input
              id="add_event_duration"
              type="number"
              min="1"
              name="duration"
              value={data.duration}
              onChange={this.onChange}
            />
          </div>
          <div className="FormElement">
            <label htmlFor="add_event_title">Title:</label>
            <textarea
              id="add_event_title"
              style={{ resize: "vertical", width: "100%" }}
              rows={2}
              minLength={4}
              name="title"
              value={data.title}
              onChange={this.onChange}
            />
          </div>
          <div className="FormElement">
            <button className="Btn">Add new event</button>
          </div>
        </form>
      </div>
    );
  }
}
function validate({ title, duration, start }) {
  const errors = {};

  if (duration > WORK_DURATION) errors.duration = "Your event lasts too long";
  if (duration < 1)
    errors.duration = "Your event should take at least 1 minute";
  if (start === -1) errors.start = "Start of your event is out of range";
  if (start + duration > WORK_DURATION)
    errors.start = "Your event start too late for such duration";
  if (title.length < 4) errors.title = "Your event title is too short";

  return errors;
}
