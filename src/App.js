import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Addtask from "./components/Addtask";
import Footer from "./components/footer";
import About from "./components/About";
import { useState, useEffect } from "react";
function App() {
  const [showaddtask, setshowaddtask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const gettask = async () => {
      const taskfs = await fetchtasks();
      setTasks(taskfs);
    };
    gettask();
  }, []);

  // fetch task
  const fetchtasks = async () => {
    const res = await fetch("http://localhost:3000/task");
    const data = await res.json();
    return data;
  };

  // fetch task
  const fetchtask = async (id) => {
    const res = await fetch(`http://localhost:3000/task/${id}`);
    const data = await res.json();
    return data;
  };

  // add task
  const addtask = async (task) => {
    const res = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // delete task
  const deletetask = async (id) => {
    const res = await fetch(`http://localhost:3000/task/${id}`, {
      method: "DELETE",
    });
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert("Error Deleting This Task");
  };

  // **********************************************************************************************************
  // The problem with the toggleReminder function you provided is that it doesn't await the result of the fetchtask
  // function before trying to access its properties. This means that the tasktotoggle variable will contain a promise,
  // rather than the actual task object, and you won't be able to read its properties until the promise resolves.

  // To fix the problem, you should add the await keyword before the call to fetchtask, like this:

  // javascript
  // Copy code
  // const toggleReminder = async (id) => {
  // const tasktotoggle = await fetchtask(id)
  // const updtask = { ...tasktotoggle, reminder: !tasktotoggle.reminder }
  // const res = await fetch(`http://localhost:3000/task/${id}`, {
  // method: 'PUT',
  // headers: {
  // 'Content-type': 'application/json'
  // },
  // body: JSON.stringify(updtask)
  // })
  // const data = await res.json()
  // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  // }
  // With this change, tasktotoggle will contain the actual task object returned by the fetchtask function, rather than a
  // promise.

  // **********************************************************************************************************

  // Toggle reminder

  const toggleReminder = async (id) => {
    const tasktotoggle = await fetchtask(id);
    const updtask = { ...tasktotoggle, reminder: !tasktotoggle.reminder };
    const res = await fetch(`http://localhost:3000/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updtask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => {
            setshowaddtask(!showaddtask);
          }}
          showadd={showaddtask}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showaddtask && (
                  <Addtask onAdd={addtask} setshowaddtask={setshowaddtask} />
                )}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deletetask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No task to show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
