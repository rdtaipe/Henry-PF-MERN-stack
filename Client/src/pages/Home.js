import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  //testing redux
  const dispatch = useDispatch()
  const setter = useSelector(state => state.actions.setter)
  const state = useSelector(state => state)
  console.log(state, "state")
  return (
    <div>
      <Header />
      <Card />

    </div>
  )
}

export default Home
