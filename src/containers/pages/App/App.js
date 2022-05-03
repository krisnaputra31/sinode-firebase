import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Register from "../Register";
import Dashboard from "../Dashboard";
import Login from "../Login";
import "./App.css";

function App() {
  return (
    <Container fluid className="register">
      <Routes>
        <Route path="/" element={<Dashboard />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
