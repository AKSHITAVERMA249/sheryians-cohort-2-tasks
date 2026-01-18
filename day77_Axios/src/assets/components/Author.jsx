import React from 'react'

const Author = (props) => {
    const clr1=Math.floor(Math.random()*256)
    const clr2=Math.floor(Math.random()*256)
    const clr3=Math.floor(Math.random()*256)
  return (
    <div className='h-[200px] w-[200px] rounded-lg m-5 text-2xl text-white font-extrabold text-center'
    style={{ backgroundColor: `rgb(${clr1}, ${clr2}, ${clr3})` }}>
        <h1>{props.elem.author}</h1>
        
    </div>
  )
}

export default Author