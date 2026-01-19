import React from 'react'
import Home from './pages/Home'
import { Link, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import GirlsProduct from './pages/GirlsProduct'
import BoysProducts from './pages/BoysProducts'
import RandomAbout from './pages/RandomAbout'
import NotFound from './pages/NotFound'
const App = () => {
  return (
    <div className=' bg-purple-300 h-screen w-screen'>
      <Navbar/>
      <h1 className='text-4xl font-bold text-white absolute left-1/4 top-1/5'>HELLO JI ROUTING DI CLASS VICH SwAGAT AAA!!</h1>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/girls' element={<GirlsProduct/>} />
        <Route path='/products/boys' element={<BoysProducts/>} />

        <Route path='/about/:id' element={<RandomAbout/>} />

        <Route path="/*" element={<NotFound/>} />
      </Routes>
      </div>
  )
}

export default App