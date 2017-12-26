import PropTypes from "prop-types";
import React from "react";
import isAlphanumeric from "validator/lib/isAlphanumeric";

const EMPTY = {};
const EMPTY_DATA = {
  name: "",
  email: "",
  password: ""
};

export default class SignUpForm extends React.Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  state = {
    data: EMPTY_DATA,
    errors: EMPTY,
    success: false
  };

  componentWillUnmount() {
    clearTimeout(this.successTimer);
  }

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
          data: EMPTY_DATA,
          success: true
        });
        this.successTimer = setTimeout(
          () => this.setState({ success: false }),
          3000
        );
      })
      .catch(e => {
        this.setState({
          data: EMPTY_DATA,
          errors: { global: e.message }
        });
      });
  };

  render() {
    const { data, errors, success } = this.state;
    const errorKeys = Object.keys(errors);

    return (
      <div className="FormContainer">
        <div className="FormHeader">SingUp</div>
        {success && (
          <div className="FormMsg FormSuccess">
            User is successfully created
          </div>
        )}
        {errorKeys.length > 0 && (
          <div className="FormMsg FormError">
            {errorKeys.map(key => <div key={key}>{errors[key]}</div>)}
          </div>
        )}
        <form id="signup_form" className="FormBody" onSubmit={this.onSubmit}>
          <div className="FormElement">
            <label for="signup_email">Email:</label>
            <input
              id="signup_email"
              type="email"
              name="email"
              placeholder="example@email.com"
              value={data.email}
              onChange={this.onChange}
            />
          </div>
          <div className="FormElement">
            <label for="signup_name">Name:</label>
            <input
              id="signup_name"
              type="text"
              name="name"
              placeholder="John Carter"
              value={data.name}
              onChange={this.onChange}
            />
          </div>
          <div className="FormElement">
            <label for="signup_password">Password:</label>
            <input
              id="signup_password"
              type="password"
              name="password"
              value={data.password}
              onChange={this.onChange}
            />
          </div>
          <div className="FormElement">
            <button className="Btn">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(data) {
  const errors = {};

  if (data.password.length < 8) errors.password = "Password to short";
  if (!isAlphanumeric(data.name))
    errors.name = "Name should consist from alpha-numeric symbols";

  return errors;
}
