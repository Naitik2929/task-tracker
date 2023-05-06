import PropTypes from "prop-types";
import React from "react";
import Button from "./Button";

function Header({ title, onAdd, showadd }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {<Button color={showadd ? 'red' : 'green'} text={showadd ? 'Close' : 'Add'} onClick={onAdd} />}
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
