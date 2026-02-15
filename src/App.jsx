import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InstagramP from './componets/InstagramP'
import AdminProfile from './pages/AdminProfile'
import Navbar from './componets/Navbar'
import InstagramM from './componets/InstagramM'
import AdminDM from './pages/AdminDM'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
  
   <Routes>
    <Route path='igp' element={<InstagramP />} />
    <Route path='ad' element={<AdminProfile />} />
    <Route path='/' element={<Navbar />} />
    <Route path='igm' element={<InstagramM />} />
    <Route path='adm' element={<AdminDM />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
