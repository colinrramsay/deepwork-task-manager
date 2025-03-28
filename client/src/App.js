import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import About from './components/About'
import Login from './components/Login'
import Dashboard from './components/Dashboard'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  //check authentication
  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('http://localhost:2121/auth/user', { credentials: 'include' })
      const data = await res.json()
      setIsAuthenticated(data.isAuthenticated)
      data.user ? setUser(data.user) : setUser(null)
      console.log(data.user)
    }
    
    checkUser()
  }, [])

 

  return (
    <Router>
      <Routes>
        <Route 
          path='/' 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          } 
        />
        <Route 
          path='/dashboard' 
          element={
            //conditional check auth, if not auth navigate to /
            isAuthenticated ? (
              <Dashboard user={user} isAuthenticated={isAuthenticated}/>
            ) : (
              <Navigate to="/" />
            )
          } />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
