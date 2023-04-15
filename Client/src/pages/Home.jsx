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
  const [data, setData] = useState([])
  const [page, setPage] = useState(10)
  const [count, setCount] = useState(10)
  const [documents, setDocuments] = useState(0)


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
      skip:page-count
    }

    const query=queryString(obj)

    get(url+`/find?${query}`).then(res =>{
      dispatch(setter({keys:"products",value:res.data.product}))

      setDocuments(res.data.documents)
  
      setData(res.data.product)
    })
  }

  return (
    <div>
      <NavBar />
      <Sidebar />
      <div  style={{marginTop:top,marginLeft:width}} className="px-2 pt-2">
        <Pagination count={Math.ceil(documents / count)} setPage={n=>{
          setPage(n*count)
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
