import React from "react";
import { connect } from "react-redux";

class Login extends React.Component {
  render() {
    return (
      <>
        <div>Login Pages{this.props.popupProps}</div>
      </>
    );
  }
}

const reduxState = (state) => ({
  popupProps: state.popup,
});

export default connect(reduxState, null)(Login);
