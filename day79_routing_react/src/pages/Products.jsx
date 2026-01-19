import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
        <div className='text-7xl font-bold text-black absolute left-1/4 top-1/2'>Product Page
        <div className='flex flex-between gap-10 text-3xl '>
        <div className='bg-pink-500 h-[100px] w-[300px] border-amber-100 border-4 rounded-lg'> <Link to="/products/girls">Girl's Products</Link> </div> 
        <div className='bg-blue-700 h-[100px] w-[300px] border-amber-100 border-4 rounded-lg'><Link to="/products/boys">Boy's Products</Link></div>
        </div>
        </div>

  )
}

export default Products