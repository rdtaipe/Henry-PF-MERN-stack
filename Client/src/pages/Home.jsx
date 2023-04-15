import React from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar/Sidebar'
import axios from 'axios'

const Home = () => {
  //testing redux
  const dispatch = useDispatch()
  const setter = useSelector(state => state.actions.setter)
  const state = useSelector(state => state)
  console.log(state, "state")
  

   
 
 const obj={
  m:"product",
  filter:{name:["aaa","bbb","ccc"]},
  sort:{name:1},
 }
const queryString=(obj)=>{
  return Object.keys(obj).map(key => {
    if (typeof obj[key] === 'object') {
      return `${key}=${encodeURIComponent(JSON.stringify(obj[key]))}`;
    }
    return `${key}=${encodeURIComponent(obj[key])}`;
  }).join('&');
}
const query=queryString(obj)
console.log(`http://localhost:5000/find?${query}`)
  axios.get(`http://localhost:5000/find?${query}`)
  .then(res => {
    console.log(res.data)
  })

  // http://localhost:5000/find?m=products&filter=%5Bobject+Object%5D&sort=%5Bobject+Object%5D
//http://localhost:5000/find?m=product&filter=%7B%22name%22%3A%5B%22aaa%22,%22bbb%22,%22ccc%22%5D%7D&sort=%7B%22name%22%3A1%7D


  return (
    <div>
      <NavBar />
      <Sidebar/>
      <Card />
    </div>
  )
}

export default Home
