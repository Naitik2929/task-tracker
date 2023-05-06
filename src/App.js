import React from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks"
import Addtask from "./components/Addtask";
import { useState } from 'react'
function App() {
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Meeting at School",
      "day": "Feb 6th at 1:30pm",
      "reminder": false
    }
  ])

  // Add task
  const addtask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newtask = { id, ...task }
    setTasks([...tasks, newtask])
  }

  // Delete task
  const deletetask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //  Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task
    ))
  }
  return (
    <div className="container" >
      <Header />
      <Addtask onAdd={addtask} />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deletetask} onToggle={toggleReminder} /> : ('No task to show')}

    </div >
  );
}
export default App;
