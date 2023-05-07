import React from "react";
import { useState } from "react";

const Addtask = ({ onAdd, setshowaddtask }) => {
  const [text, settext] = useState("");
  const [day, setday] = useState("");
  const [reminder, setrem] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Task can't be empty!");
      return;
    }
    onAdd({ text, day, reminder });
    settext("");
    setday("");
    setshowaddtask(false);
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
        />
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <input
          type="date"
          value={day}
          onChange={(e) => {
            setday(e.target.value);
          }}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => {
            setrem(e.currentTarget.checked);
          }}
        />
      </div>
      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  );
};

export default Addtask;
