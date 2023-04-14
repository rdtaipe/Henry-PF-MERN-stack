import React from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar/Sidebar'

const Home = () => {
  //testing redux
  const dispatch = useDispatch()
  const setter = useSelector(state => state.actions.setter)
  const state = useSelector(state => state)
  console.log(state, "state")

  return (
    <div>
      <NavBar />
      <Sidebar/>
      <Card />
    </div>
  )
}

export default Home
