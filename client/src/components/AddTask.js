import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const [important, setImportant] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text) {
            alert('Please add a task')
        }
        onAdd({ text, day, reminder, important })
        setText('')
        setDay('')
        setReminder(false)
        setImportant(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type="text" placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type="text" placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Reminder</label>
                <input type="checkbox" value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Important</label>
                <input type="checkbox" value={important} checked={important} onChange={(e) => setImportant(e.currentTarget.checked)}/>
            </div>

            <input type="submit" value='Save Task' className='btn btn-block' />
        </form>
    )
}

export default AddTask