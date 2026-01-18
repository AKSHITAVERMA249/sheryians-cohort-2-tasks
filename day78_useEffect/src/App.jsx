import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const App = () => {
  const [userName, setUserName] = useState('NO NAME')
  const getData=async()=>{
    const response= await axios.get("https://randomuser.me/api/")
    setUserName(response.data.results[0].name.first + " " + response.data.results[0].name.last)
  }
  const [num, setNum] = useState(0)
  useEffect(function(){
    getData()
  },[num])
  return (
    <div className='bg-amber-500 h-screen w-screen flex flex-col items-center justify-center h-screen '>
      <h1 className='text-4xl text-pink-600 text-bold'>{userName}</h1>
      <button onClick={()=>{
        setNum(num+1)
      }}
      className='bg-blue-700 text-2xl text-amber-100 p-2'> CHANGE NAME</button>
    </div>
  )
}

export default App