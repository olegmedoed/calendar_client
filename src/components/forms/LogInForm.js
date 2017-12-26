import PropTypes from "prop-types";
import React from "react";

const EMPTY = {};
const EMPTY_DATA = {
  email: "",
  password: ""
};

export default class LogInForm extends React.Component {
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

    const data = this.state.data;
    const errors = validate(data);

    if (Object.keys(errors).length) {
      return this.setState({ errors });
    }

    this.props
      .submit(data)
      .then(() => {
        this.setState({
          data: EMPTY_DATA
        });
      })
      .catch(e => {
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
      <div className="FormContainer">
        <div className="FormHeader">Login</div>
        {errorKeys.length > 0 && (
          <div className="FormMsg FormError">
            {errorKeys.map(key => <div key={key}>{errors[key]}</div>)}
          </div>
        )}
        <form id="login_form" className="FormBody" onSubmit={this.onSubmit}>
          <div className="FormElement">
            <label htmlFor="login_email">Email:</label>
            <input
              id="login_email"
              type="email"
              name="email"
              placeholder="example@email.com"
              value={data.email}
              onChange={this.onChange}
            />
          </div>
          <div className="FormElement">
            <label htmlFor="login_password">Password:</label>
            <input
              id="login_password"
              type="password"
              name="password"
              value={data.password}
              onChange={this.onChange}
            />
          </div>
          <div className="FormElement">
            <button className="Btn">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(data) {
  const errors = {};

  if (data.password.length < 8) errors.password = "Password to short";

  return errors;
}
