import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar/Sidebar'
import Grid from '../components/Grid'
import Pagination from '../components/Pagination'
import SortBar from '../components/SortBar'
import Carousel from '../components/Carousel'
import Offer1 from '../assets/imagesCarousel/Offer1.png'
import Offer2 from '../assets/imagesCarousel/Offer2.png'
import Offer3 from '../assets/imagesCarousel/Offer3.png'
import Offer4 from '../assets/imagesCarousel/Offer4.png'
import Offer5 from '../assets/imagesCarousel/Offer5.png'
import Offer6 from '../assets/imagesCarousel/Offer6.png'
import Offer7 from '../assets/imagesCarousel/Offer7.png'


const Home = () => {

  const images = [Offer1, Offer2, Offer3, Offer4, Offer5, Offer6, Offer7]

  //testing redux
  const dispatch = useDispatch()
  //global state
  const { url, get } = useSelector(({ state }) => state.server)
  const setter = useSelector(state => state.actions.setter)
  const products = useSelector(state => state.products)
  const { top, width } = useSelector(({ state }) => state.sidebar)
  const { queryString } = useSelector(({ state }) => state.utils)
  const search = useSelector(state => state.searchName)
  //local state
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [count, setCount] = useState(0)
  const [documents, setDocuments] = useState(0)

  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState({})



  useEffect(() => {
    getData({ filter:{name: [search], ...filter},sort:sort })

  }, [filter,sort, search, page])




  const getData = ({filter,sort}) => {
  console.log(sort)
    const obj = {
      m: "product",
      filter: filter,
      options: "i",
      // regex:"all", 
      sort: sort,
      limit: limit * page,
      skip: limit * page - 10
    }

    const query = queryString(obj)

    get(url + `/find?${query}`).then(res => {
      var resData = res.data.product
      dispatch(setter({ keys: "products", value: resData }))
      setDocuments(res.data.documents)
      setData(resData)
      let n = Math.ceil(res.data.documents / limit)

      setCount((page === 1 && resData.length < limit) ? 1 : n)
      if (page > 1 && resData.length === 0) {
        setPage(1)
      }
    })
  }

  return (
    <div>
      <NavBar />
      <Sidebar setFilter={(e) => { setFilter(e) }} />
      <div style={{ marginTop: top, marginLeft: width }} className="px-2 min-h-[1000px]">
        <Carousel images={images} />
        <SortBar setSort={(e) => { setSort(e) }} />
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