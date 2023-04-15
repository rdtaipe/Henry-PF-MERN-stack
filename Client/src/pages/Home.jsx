import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar/Sidebar'
import { Grid } from '../components/Grid'

const Home = () => {
  //testing redux
  const dispatch = useDispatch()
  const { url, get } = useSelector(({ state }) => state.server)
  const setter = useSelector(state => state.actions.setter)
  const products = useSelector(state => state.products)
  const productsFiltered = useSelector(state => state.productsFiltered)
  const { top, width } = useSelector(({ state }) => state.sidebar)
  const [data, setData] = useState([])



  useEffect(() => {
    get(url + "/find?m=product").then(res => {
      dispatch(setter({ keys: "products", value: res.data.product }))
      setData(res.data.product)
    })


  }, [(products.length > 0 ? null : products)])

  /*  const obj={
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
    }) */

  //http://localhost:5000/find?m=products&filter=%5Bobject+Object%5D&sort=%5Bobject+Object%5D
  //http://localhost:5000/find?m=product&filter=%7B%22name%22%3A%5B%22aaa%22,%22bbb%22,%22ccc%22%5D%7D&sort=%7B%22name%22%3A1%7D

  return (
    <div>
      <NavBar />
      <Sidebar />
      <Grid childHeight={260} childWidth={200} style={{ marginTop: top, marginLeft: width }} className="px-2 pt-2">
        {productsFiltered.length > 0
          ? productsFiltered.map((item, index) => {
            return <Card key={index} data={item} />
          })
          : data.map((item, index) => {
            return <Card key={index} data={item} />
          })}
      </Grid>
    </div>
  )
}

export default Home
