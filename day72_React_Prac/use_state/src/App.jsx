import React from 'react'
import { useState } from 'react'
const App = () => {
  const [userName, setUserName] = useState('')
  const [allUser, setAllUser] = useState(['aashi'])
  const SubmitHandler=(e)=>{
    e.preventDefault();
    console.log("submitted")
    const oldUsers= [...allUser]
    oldUsers.push(userName)
    console.log(oldUsers)
    setAllUser(oldUsers)
    setUserName('')
  }
  
  return (

    <div>
     <form onSubmit={(e)=>{
      SubmitHandler(e);
     }}>
      <input type="text" 
      placeholder='Enter your Name'
      value={userName}
      onChange={(e)=>{
        setUserName(e.target.value)
        
      }} 
      />
      <button>Submit</button>
     </form>
     {allUser.map((elem, idx) => (
        <h4 key={idx}>{elem}</h4>
      ))}
    </div>
  )
}

export default App