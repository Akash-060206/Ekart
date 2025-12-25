import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

const App = () => {
  return (
    <div>
      <Navbar />
        <hr />
        <div className='flex w-full'>
          <Sidebar/>
          <div className='w-[70%] mx-auto ml-[max(5vw,25px) my-8 text-gray-600 text-base]'>
            <Routes>
              <Route path='/add' element={<Add />}/>
              <Route path='/list' element={<List />}/>
              <Route path='/orders' element={<Orders />}/>
            </Routes>
          </div>
        </div>
    </div>
  )
}

export default App
