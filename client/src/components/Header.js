import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAddTask, user }) => {
    const location = useLocation()
    
    const logout = async () => {
        const res = await fetch('http://localhost:2121/auth/logout', {credentials: 'include',})
        const data = await res.json()
        window.location.href = '/'
    }
    
    return (
        <header className='header'>
            <h1>{title}</h1>
            {user && <Button color='red' text='Logout' onClick={logout} />}
        </header>
    )
}

export default Header