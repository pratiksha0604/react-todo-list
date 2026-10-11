
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my-todo-tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('my-todo-tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    if (task.trim() === '') {
      alert('Please enter a task!')
      return
    }

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false
    }

    setTasks([...tasks, newTask])
    setTask('')
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <p className="subtitle">
        Organize your day, one task at a time!
      </p>

      <div className="input-area">
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask()
          }}
        />

        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((item) => (
          <li key={item.id} className="task-item">
            <label className={item.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
              />
              {item.text}
            </label>

            <button
              className="delete-btn"
              onClick={() => deleteTask(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="empty-message">
          No tasks yet. Add your first task!
        </p>
      )}

      <p className="task-count">
        Total tasks: {tasks.length} | Completed:{' '}
        {tasks.filter((item) => item.completed).length}
      </p>
    </div>
  )
}

export default App
