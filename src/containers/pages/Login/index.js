import React from "react";
import { connect } from "react-redux";

class Login extends React.Component {
  changeUserName = () => {
    this.props.changeUser();
  };
  render() {
    return (
      <>
        <div>Login Pages{this.props.userName}</div>
        <button onClick={this.changeUserName}>Change User Name</button>
      </>
    );
  }
}

const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USERNAME", value: " Jelvin Krisna Putra" });
  }, 3000);
};

const reduxState = (state) => ({
  popupProps: state.popup,
  userName: state.user,
});

const reduxDispatch = (dispatch) => ({
  changeUser: () => dispatch(actionUserName()),
});

export default connect(reduxState, reduxDispatch)(Login);
