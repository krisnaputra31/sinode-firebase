import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Register from "../Register";
import Dashboard from "../Dashboard";
import Login from "../Login";
import "./App.css";

// redux
import { store } from "../../../config/redux";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Container fluid className="register">
        <Routes>
          {/* {console.log(store.getState())} */}
          {/* {store.getState().isLogin ? <Route path="/" element={<Dashboard />} exact /> : <Route path="/login" element={<Login />} />} */}
          <Route path="/" element={<Dashboard />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
