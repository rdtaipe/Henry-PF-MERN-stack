import React,{ useEffect,useState } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar/Sidebar'
import Grid from '../components/Grid'
import Pagination from '../components/Pagination'

const Home = () => {
  //testing redux
  const dispatch = useDispatch()
  const {url,get} =useSelector(({state}) => state.server)
  const setter = useSelector(state => state.actions.setter)
  const products = useSelector(state => state.products)
  const {top,width}= useSelector(({state}) => state.sidebar)
  const {queryString}= useSelector(({state} )=> state.f)

  const [refresh, setRefresh] = useState(false)


  const [page, setPage] = useState(10)

  useEffect(() => {
    getData()
  }, [(page)])

  const getData=()=>{
    const obj={
      m:"product",
      limit:page,
      skip:page-10
    }
    
    const query=queryString(obj)

    get(url+`/find?${query}`).then(res =>{
      dispatch(setter({keys:"products",value:res.data.product}))
      setRefresh(Math.random())
    })
  }


//http://localhost:5000/find?m=products&filter=%5Bobject+Object%5D&sort=%5Bobject+Object%5D
//http://localhost:5000/find?m=product&filter=%7B%22name%22%3A%5B%22aaa%22,%22bbb%22,%22ccc%22%5D%7D&sort=%7B%22name%22%3A1%7D

  return (
    <div>
      <NavBar/>
      <Sidebar />
      <div  style={{marginTop:top,marginLeft:width}} className="px-2 pt-2">
        <Pagination setPage={n=>{
          setPage(n*10)

        }}/>
        <Grid childHeight={260} childWidth={200}>
          {products.map((item,index) => {
              return <Card key={index} data={item} />
            })}
        </Grid>
      </div>
    </div>
  )
}

export default Home
