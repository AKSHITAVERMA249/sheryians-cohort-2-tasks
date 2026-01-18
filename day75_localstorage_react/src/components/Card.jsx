import React from 'react'

const Card = (props) => {
  return (
    <div className='rounded-xl m-5 border-2 bg-amber-200 w-[24vw] p-5 text-center text-black flex flex-col justify-items-center' key={props.idx}>
        <img className='rounded-full h-30 w-30 ml-25 object-cover object-center' src={props.elem.imageUrl} alt="person image" />
        <h1 className='text-3xl font-extrabold text-black '>{props.elem.username}</h1>
        <h4 className='text-blue-400 text-xl'>{props.elem.role}</h4>
        <p>{props.elem.desc}</p>
        <button className='bg-red-500 rounded-sm text-2xl p-2 cursor-pointer active:80'
        onClick={()=>{
          props.deleteHandler(props.idx);
        }}
        >Remove</button>
    </div>
  )
}

export default Card