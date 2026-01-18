import React from 'react'
import { useState } from 'react'
import Card from './components/card'
const App = () => {
  const [username, setUsername] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [role, setRole] = useState('')
  const [desc, setDesc] = useState('')
  
  const localdata=JSON.parse(localStorage.getItem('all-users')) || []
   const [allUsers, setAllUsers] = useState(localdata)
  function submitHandler(e){
    e.preventDefault();
    const oldusers=[...allUsers]
    oldusers.push({username,imageUrl,role,desc})
    setAllUsers(oldusers)
    localStorage.setItem('all-users',JSON.stringify(oldusers))
    console.log(allUsers)
    setUsername('')
    setImageUrl('')
    setRole('')
    setDesc('')
  }
  function deleteHandler(idx){
    const copyusers=[...allUsers]
    copyusers.splice(idx,1)
    setAllUsers(copyusers)
    localStorage.setItem('all-users',JSON.stringify(copyusers))
    console.log("element deleted")
  }
  return (
    <div className='bg-red-300 h-screen w-screen'>
      <form className='ml-20 flex flex-wrap'
      
      onSubmit={(e)=>{
        submitHandler(e);
      }}
      >
        <input className='border-2 px-5 py-2 rounded m-2 w-[45%]' 
        type="text" placeholder='Enter your Name'
        required
        value={username}
        onChange={(e)=>{
          setUsername(e.target.value);
        }}
        />
        <input className='border-2 px-5 py-2 rounded m-2 w-[45%]' 
        type="text" placeholder='Image URL'
        value={imageUrl}
        onChange={(e)=>{
          setImageUrl(e.target.value)
        }}
        />
        <input className='border-2 px-5 py-2 rounded m-2 w-[45%]' 
        type="text" placeholder='Enter Role'
        required
        value={role}
        onChange={(e)=>{
          setRole(e.target.value);
        }}
        />
        <input className='border-2 px-5 py-2 rounded m-2 w-[45%]'
         type="text" placeholder='Enter Description'
         value={desc}
         onChange={(e)=>{
          setDesc(e.target.value);
         }}
         />
        <button className='bg-green-300 border-2 px-5 py-2 rounded m-2 w-[90%] cursor-pointer'>Create Role</button>
      </form>
      <div className='flex felx-wrap p-20'>
        {
          allUsers.map((elem,idx)=>{
            return  <Card 
            elem={elem}
            deleteHandler={deleteHandler}
            idx={idx}
            />
          })
        }
      </div>
    </div>
  )
}

export default App