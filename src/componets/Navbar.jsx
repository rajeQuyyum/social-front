import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className=''>
        <NavLink to="/ad">profil edit</NavLink>
        <NavLink to="/igp">Instagram Profile</NavLink>
        <NavLink to="/igm">message edit</NavLink>
    </div>
  )
}
