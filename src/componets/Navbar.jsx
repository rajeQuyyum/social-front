import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='flex justify-between m-auto w-100 '>
        <NavLink className="list-item text-red-400" to="/ad">profil edit admin</NavLink>
        <NavLink className="list-item text-blue-500" to="/igp">Profile</NavLink>
        <NavLink className="list-item text-yellow-500" to="/igm">message</NavLink>
        <NavLink className="list-item text-black" to="/adm">admin message</NavLink>
    </div>
  )
}
