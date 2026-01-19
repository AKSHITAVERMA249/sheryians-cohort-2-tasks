import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-screen h-20 p-5 bg-emerald-300 flex justify-between text-2xl'>
        <h2>Navbar</h2>
        <div className='flex gap-3 text-2xl'>
            <Link to="/about">ABOUT</Link>
            <Link to="/">HOME</Link>
            <Link to="/products">PRODUCT</Link>

        </div>
      
      </div>
  )
}

export default Navbar