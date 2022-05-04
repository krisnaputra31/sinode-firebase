import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Formlink = ({ isSuccess }) => {
  if (isSuccess) {
    return (
      <Form.Label className="mx-4 mt-3 p-2 text-success bg-dark rounded">
        Click Here if web not redirect
        <Link to="/dashboard"> Dashboard</Link>
      </Form.Label>
    );
  }
  return null;
};

export default Formlink;
