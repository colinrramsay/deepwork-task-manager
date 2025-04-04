import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''} ${task.important ? 'important' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}{'    '}
                <FaTimes 
                    onClick={onDelete} 
                    style={{ color: 'red', cursor: 'pointer' }}
                />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task