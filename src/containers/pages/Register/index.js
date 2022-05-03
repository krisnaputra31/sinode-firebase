import { Col, Container, Form, Row } from "react-bootstrap";
import React, { Fragment } from "react";
import DefButton from "../../../components/atoms/DefButton/Defbutton";

// redux
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action/action";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.registerUserAPI({ email, password });
    console.log(this.props.errorMessage);
  };

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col className="col-md-6 col-10 mx-auto mt-5">
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChangeText} />
                  <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChangeText} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>{this.props.errorMessage}</Form.Label>
                </Form.Group>
                {/* <Button variant="primary" type="submit" onClick={this.handleRegisterSubmit}>
                    Submit
                  </Button> */}
                <DefButton onClick={this.handleRegisterSubmit} title="Submit" loading={this.props.isLoading} />
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
