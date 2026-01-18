import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Author from './assets/components/Author'
const App = () => {
  const [allData, setAllData] = useState([])

  const getData=async()=>{
    const response=await axios.get("https://picsum.photos/v2/list")
    console.log(response.data);
    setAllData(response.data)
  }
  return (
    <>
    <div className='text-center flex flex-wrap m-3 mt-[5%] ml-[45%]'>
      <button
       className='rounded-lg bg-pink-300 border-pink-500 border-2 p-5 cursor-pointer' 
       onClick={getData}
      >GET DATA</button>
      
    </div>
    <div className='flex flex-wrap text-center justify-items-center ml-8'>
        {
      allData.map((elem,idx)=>{
        return <Author 
        elem={elem}
        idx={idx}
        />
      })
    }
      </div>
    </>
  )
}

export default App