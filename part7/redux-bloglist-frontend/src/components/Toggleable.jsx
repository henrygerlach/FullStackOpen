import { useState, useImperativeHandle } from "react";
import { Button } from "react-bootstrap";

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="outline-info" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Toggleable;
