import React from 'react'
import { useState } from 'react'
import Task from './Task'
const Tasks = ({ tasks, onDelete, onToggle }) => {

    return (
        // setTasks insted of task.push() its a one way data
        // setTasks([...tasks,{}])
        <>
            {tasks.map((task, i) =>
                <Task key={i} task={task} onDelete={onDelete} onToggle={onToggle}>{task.text}</Task>)}
        </>
    )
}

export default Tasks
