import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Tasks from './Tasks'
import AddTask from './AddTask'
import Button from './Button'

function Dashboard({user, isAuthenticated}) {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [filterImportant, setFilterImportant] = useState(false)

    const location = useLocation()
    
    useEffect(() => {
        const getTasks = async () => {
          const tasksFromServer = await fetchTasks()
          setTasks(tasksFromServer)
        }
        
        getTasks()
    }, [])

    //Fetch Tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:2121/tasks', {credentials: 'include'})
      if (!res.ok) {
        // Parse the error response
        const errorData = await res.json();
        console.error('Error:', errorData.message); // Logs 'No authorized user' or other error
        return []
    } else {
      const data = await res.json()
      return data
    }
    }

    //Delete Task
    const deleteTask = async (id) => {
      await fetch(`http://localhost:2121/tasks/${id}`, { method: 'DELETE', credentials: 'include',})
      
      setTasks(tasks.filter((task) => task._id !== id))
    }

    //Toggle Reminder
    const toggleReminder = async (id) => {
      const taskToToggle = tasks.find((task) => task.id = id)
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

      const res = await fetch(`http://localhost:2121/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask),
        credentials: 'include',
      })
      const data = await res.json()

      setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    }

    //Add Task
    const addTask = async (task) => {
      const res = await fetch('http://localhost:2121/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task),
        credentials: 'include',
       })
      const data = await res.json()

      if (!res.ok) {
        console.error('Error:', data)
      } else {
        console.log(data)
        console.log(tasks)
        setTasks([...tasks, data])
      }
    }

    return (
        <div className="container">
            <Header title="Task Tracker" showAddTask={showAddTask} user={user} />
            <Button text='Deep Work' color={filterImportant ? 'grey' : 'black'} onClick={() => setFilterImportant(!filterImportant)}/>
            {location.pathname === '/dashboard' && <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={() => setShowAddTask(!showAddTask)}/>}
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} filterImportant={filterImportant} onDelete={deleteTask} onToggle={toggleReminder} /> : ('No Tasks to Show')} 
            <Footer />
        </div>
    )
}

export default Dashboard;