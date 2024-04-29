import React from 'react'
import { NavLink } from 'react-router-dom';
import NavCart from './navCart';

const Nav: React.FC = () => {
  return (
    <div className='nav-container'>
        <div className="brand-container">
            <img src="src/assets/Castello.webp" alt="" />
        </div>
        <div className="menu-container">
            <NavLink to="/cart">
                <NavCart></NavCart>
            </NavLink>
        </div>
    </div>
  )
}

export default Nav
