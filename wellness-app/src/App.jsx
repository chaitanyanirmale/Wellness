import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import CreateSession from './pages/CreateSession'
import MySessions from './pages/MySessions'
import UpdateSession from './pages/UpdateSession'

export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path="/create-session" element={<CreateSession />} />
          <Route path="/update-session/:id" element={<UpdateSession />} />
        </Route>
      </Routes>
    
    </BrowserRouter>
  )
}
