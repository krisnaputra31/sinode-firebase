import { Button } from "react-bootstrap";

const DefButton = ({ title, onClick, loading }) => {
  if (loading) {
    return (
      <fieldset disabled>
        <Button variant="primary" type="submit" onClick={onClick}>
          Loading...
        </Button>
      </fieldset>
    );
  }
  return (
    <Button variant="primary" type="submit" onClick={onClick}>
      {title}
    </Button>
  );
};

export default DefButton;
