import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Signup from '../pages/signup'
import Login from '../pages/login'
import Room from '../pages/room.js'

const AppRoutes = () => {
  return (
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/home' element={<Dashboard/>} />
    <Route path='/room' element={<Room/>} />
  </Routes>
  )
}

export default AppRoutes