import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { Fragment } from "react";

// firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../../config/firebase";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  handleChangeText = (e) => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({
          errorMessage: errorMessage.split(" ").slice(1, -1).join(" "),
        });
      });
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>{this.state.errorMessage}</Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleRegisterSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Register;
