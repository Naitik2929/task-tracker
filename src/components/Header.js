import PropTypes from "prop-types";
import React from "react";
import Button from "./Button";

function Header({ title }) {
  const onclick = (e) => {
    console.log("Click");
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="green" text="Add" onClick={onclick} />
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
