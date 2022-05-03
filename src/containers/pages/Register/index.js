import { Col, Container, Form, Row } from "react-bootstrap";
import React, { Fragment } from "react";
import DefButton from "../../../components/atoms/DefButton/Defbutton";

// redux
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action/action";
import Formlink from "../../../components/atoms/Formlink/Formlink";

class Register extends React.Component {
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

  handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const res = await this.props.registerUserAPI({ email, password }).catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
        succesLogin: "Set Up Success",
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
              <h1> SIGN UP PAGE </h1>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-6 col-10 mx-auto mt-1">
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
                  <Form.Label className="text-danger">{this.props.errorMessage === "Error" ? "Please Fill All Field" : this.props.errorMessage}</Form.Label>
                  <Form.Label className="text-success">{this.state.succesLogin}</Form.Label>
                </Form.Group>
                <DefButton onClick={this.handleRegisterSubmit} title="Submit" loading={this.props.isLoading} />
                <Formlink isSuccess={this.state.succesLogin} />
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
});

const reduxDispatch = (dispatch) => ({
  registerUserAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
