import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar/Sidebar'
import Grid from '../components/Grid'
import Pagination from '../components/Pagination'

const Home = () => {
  //testing redux
  const dispatch = useDispatch()
  const { url, get } = useSelector(({ state }) => state.server)
  const setter = useSelector(state => state.actions.setter)
  const products = useSelector(state => state.products)
  const {top,width}= useSelector(({state}) => state.sidebar)
  const {queryString}= useSelector(({state} )=> state.utils)
  const search = useSelector(state => state.searchName)

  const [refresh, setRefresh] = useState(false)
  const [page, setPage] = useState(10)


  useEffect(() => {
    getData()

  }, [search,page])
  const getData=()=>{
    const filter={
      name:[search]
    }
    
    const obj={
      m:"product",
      filter:search===""?{}:filter,
      options:"i",
      regex:"all", 
      limit:page,
      skip:page-10
    }

    const query=queryString(obj)

    get(url+`/find?${query}`).then(res =>{
      dispatch(setter({keys:"products",value:res.data.product}))
      setRefresh(Math.random())
    })
  }

  return (
    <div>
      <NavBar />
      <Sidebar />
      <div  style={{marginTop:top,marginLeft:width}} className="px-2 pt-2">
        <Pagination setPage={n=>{
          setPage(n*10)
        }}/> 
        <Grid childHeight={260} childWidth={200}>
        {products.map((item, index) => {
            return <Card key={index} data={item} />
          })}
      </Grid>
      </div>

    </div>
  )
}

export default Home
