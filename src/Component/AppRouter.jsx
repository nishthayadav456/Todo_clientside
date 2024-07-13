import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Home from './Home.jsx'
import Todo from './Todo.jsx'
import { AuthProvider } from './AuthContext.jsx'
const AppRouter = () => {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
       <Route path="/todo" element={<Todo/>}/>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
      
    </div>
  )
}

export default AppRouter
