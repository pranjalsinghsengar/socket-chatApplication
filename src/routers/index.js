import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Signup from '../pages/signup'
import Login from '../pages/login'

const AppRoutes = () => {

  return (
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/home' element={<Dashboard/>} />
  </Routes>
  )
}

export default AppRoutes