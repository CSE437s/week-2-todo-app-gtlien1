import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [taskname, setTaskname] = useState('');
  const [taskdue, setTaskdue] = useState('');
  const [activeTasks, setActiveTasks] = useState([]);
  
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchTasks();
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const task = {
      taskname: taskname,
      taskdue: taskdue,
    };
    fetch('http://localhost:3000/addtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        // Fetch updated tasks after adding a new task
        fetchTasks();
      })
      .catch((err) => console.log(err));
  };

  const fetchTasks = () => {
    fetch('http://localhost:3000/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

    })
      .then((res) => res.json())
      .then((data) => {
        setActiveTasks(data.tasks);
      })
      .catch((err) => console.log(err));
  };

  const handleAppClick = () => {
    // Fetch data from the backend when the user clicks on anything in the app
    fetchTasks();
  };

  const renderContent = () => {
    return (
      <div onClick={handleAppClick}>
        <h1>Welcome to ToDoList</h1>
        <h2>Add a task</h2>
        <form onSubmit={addTask}>
          <label>
            Task Name: 
            <input
              type="text"
              value={taskname}
              onChange={(e) => setTaskname(e.target.value)}
              required
            />
          </label>
          <label>
            Due:
            <input
              type="date"
              value={taskdue}
              onChange={(e) => setTaskdue(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add Task</button>
        </form>

        <h2>
          Active Tasks:
          <br/>
        </h2>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default ToDoList;
