import React, { Fragment } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import DefButton from "../../../components/atoms/DefButton/Defbutton";
import { addDataToAPI, getDataFromApi, putDataToApi } from "../../../config/redux/action/action";
import "./index.css";

class Dashboard extends React.Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Save",
    noteId: "",
  };

  handleSavedNotes = (e) => {
    e.preventDefault();
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, changeNotes } = this.props;
    const { uid } = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title,
      content,
      date: new Date().getTime(),
      userId: uid,
    };
    if (textButton === "Save") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      changeNotes(data);
    }
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  componentDidMount() {
    const { uid } = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(uid);
  }

  updateNote = (note) => {
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "Change",
      noteId: note.id,
    });
  };

  cancelUpdate = (e) => {
    e.preventDefault();
    this.setState({
      title: "",
      content: "",
      textButton: "Save",
    });
  };

  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props;
    const { updateNote, onInputChange, handleSavedNotes, cancelUpdate } = this;
    return (
      <Fragment>
        <Container>
          <Row>
            <Col className="col-md-6 mt-5 mb-3 col-10 mx-auto mt-1">
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => onInputChange(e, "title")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="textarea">
                  <Form.Label>textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} value={content} onChange={(e) => onInputChange(e, "content")} />
                </Form.Group>
                <DefButton title={textButton} loading={false} onClick={(e) => handleSavedNotes(e)} />
                {textButton === "Change" ? (
                  <Button variant="warning" type="submit" onClick={(e) => cancelUpdate(e)} className="mx-auto">
                    Cancel
                  </Button>
                ) : null}
              </Form>
            </Col>
          </Row>
          <Row>
            <hr></hr>
            {notes.length > 0 ? (
              <Fragment>
                {notes.map((note) => {
                  return (
                    <Col className="col-md-8 text-center d-flex justify-content-center col-10 mx-auto mt-2 card-content" key={note.id} onClick={() => updateNote(note)}>
                      <Card style={{ width: "18rem" }}>
                        <Card.Body className="box-shadow">
                          <Card.Title>{note.data.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{new Date(note.data.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</Card.Subtitle>
                          <Card.Text>{note.data.content}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Fragment>
            ) : (
              <Fragment>
                <Col className="col-md-8 text-center d-flex justify-content-center col-10 mx-auto mt-2">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title className="text-danger">EMPTY DATA</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Fragment>
            )}
            ;
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromApi(data)),
  changeNotes: (data) => dispatch(putDataToApi(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
