import React from 'react'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar/Sidebar'

const Home = () => {
  return (
    <div>
      <NavBar />
      <Sidebar/>
      <Card />
    </div>
  )
}

export default Home
