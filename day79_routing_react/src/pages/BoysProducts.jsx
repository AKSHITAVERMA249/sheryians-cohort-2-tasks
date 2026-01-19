import React from 'react'
import { Link } from 'react-router-dom'

const BoysProducts = () => {
  return (<>
                <div className='text-7xl bg-blue-400 font-bold text-black absolute left-1/4 top-1/2'>Boy's Product Page</div>
                <div className='text-2xl bg-amber-600 h-[80px] w-[100px] rounded-xl border-2 border-amber-900'>
                    <Link to="/products">Back</Link>
                </div>
                </>
  )
}

export default BoysProducts