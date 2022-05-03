import React, { Fragment } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import DefButton from "../../../components/atoms/DefButton/Defbutton";
import Formlink from "../../../components/atoms/Formlink/Formlink";
import { loginUserAPI } from "../../../config/redux/action/action";

class Login extends React.Component {
  // from register.js
  state = {
    email: "",
    password: "",
    succesLogin: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const res = await this.props.loginUserAPI({ email, password }).catch((err) => err);
    if (res) {
      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
        succesLogin: "Login Success",
      });
    } else {
      this.setState({
        email: "",
        password: "",
        succesLogin: "",
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col className="col-md-6 col-10 mx-auto mt-5 text-center text-success">
              <h1> LOGIN PAGE </h1>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-6 col-10 mx-auto mt-5">
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChangeText} value={this.state.email} />
                  <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Label className="text-danger">{this.props.errorMessage === "Error" ? "User Or Password Wrong" : this.props.errorMessage}</Form.Label>
                  <Form.Label className="text-success">{this.state.succesLogin}</Form.Label>
                </Form.Group>
                <DefButton onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                <Formlink isSuccess={this.props.isLogin} />
              </Form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
  errorMessage: state.errorMessage,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  loginUserAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);

// JUST FOR DEMO

// changeUserName = () => {
//   this.props.changeUser();
// };

// const actionUserName = () => (dispatch) => {
//   setTimeout(() => {
//     return dispatch({ type: "CHANGE_USERNAME", value: " Jelvin Krisna Putra" });
//   }, 3000);
// };

// const reduxState = (state) => ({
//   popupProps: state.popup,
//   userName: state.user,
// });

// const reduxDispatch = (dispatch) => ({
//   changeUser: () => dispatch(actionUserName()),
// });
