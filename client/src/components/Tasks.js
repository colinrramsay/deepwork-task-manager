import Task from './Task'
import Button from './Button'

import { useState } from 'react'

const Tasks = ({tasks, onDelete, onToggle, filterImportant}) => {
    const tasksToShow = filterImportant ? tasks.filter(task => task.important) : tasks
    return (
        <>
            {tasksToShow.map((task) => (
                <Task key={task._id} task={task} onDelete={() => onDelete(task._id)} onToggle={onToggle} />
            ))}
        </>
    )
}

export default Tasks;