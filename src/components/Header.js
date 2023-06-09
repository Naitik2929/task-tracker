import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import React from "react";
import Button from "./Button";

function Header({ title, onAdd, showadd }) {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showadd ? "red" : "green"}
          text={showadd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
}
Header.defaultProps = {
  title: "Task Tracker",
};
Header.prototype = {
  title: PropTypes.string,
};
export default Header;
