import React from 'react'
import { Link } from 'react-router-dom'
const GirlsProduct = () => {
  return (
    <>
            <div className='text-7xl bg-pink-300 font-bold text-black absolute left-1/4 top-1/2'>GIRL's Product Page</div>
            <div className='text-2xl bg-amber-600 h-[80px] w-[100px] rounded-xl border-2 border-amber-900'>
                <Link to="/products">Back</Link>
             </div>
    </>
  )
}

export default GirlsProduct