import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

const MyNavbar = () => {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/home" className="pt-2">
      <Nav.Item className="no-pad">
        <Nav.Link eventKey="home">
          <Link to="/dashboard" className="this-link">
            Home
          </Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="no-pad">
        <Nav.Link eventKey="login">
          <Link to="/login" className="this-link">
            Login
          </Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="no-pad">
        <Nav.Link eventKey="register">
          <Link to="/register" className="this-link">
            Register
          </Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default MyNavbar;
