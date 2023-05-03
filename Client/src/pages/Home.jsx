import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar/Sidebar'
import Grid from '../components/Grid'
import Pagination from '../components/Pagination'
import SortBar from '../components/SortBar'
import Carousel from '../components/Carousel'
import Drawer from '../components/Drawer'
import Offer1 from '../assets/imagesCarousel/Offer1.png'
import Offer2 from '../assets/imagesCarousel/Offer2.png'
import Offer3 from '../assets/imagesCarousel/Offer3.png'
import Offer4 from '../assets/imagesCarousel/Offer4.png'
import Offer5 from '../assets/imagesCarousel/Offer5.png'
import Offer6 from '../assets/imagesCarousel/Offer6.png'
import Offer7 from '../assets/imagesCarousel/Offer7.png'
import Typography from "@mui/material/Typography";
import { IconButton, MenuItem } from "@mui/material";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";

const Home = () => {
  const images = [Offer1, Offer2, Offer3, Offer4, Offer5, Offer6, Offer7];
  //testing redux
  const dispatch = useDispatch();
  //global state
  const { url, get } = useSelector(({ state }) => state.server)
  const { setter } = useSelector(({ state }) => state)
  const products = useSelector(state => state.products)
  const { top, width } = useSelector(({ state }) => state.sidebar)
  const { queryString } = useSelector(({ state }) => state.utils)
  const search = useSelector(state => state.searchName)

  //local state
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});

  useEffect(() => {
    getData({ filter: { name: [search], ...filter }, sort: sort })

  }, [filter,sort, search, page])



  const getData = ({filter,sort}) => {

    const obj = {
      m: "product",
      filter: filter,
      options: "i",
      // regex:"all",
      sort: sort,
      limit: 10,
      skip: limit * page - 10,
    };

    const query = queryString(obj);

    get(url + `/find?${query}`).then((res) => {
      var resData = res.data.product;
      var documents = res.data.documents;
      dispatch(setter({ keys: "products", value: resData }));
      setData(resData);

      let n = Math.ceil(documents / limit)
      setCount((page === 1 && resData.length < limit) ? 1 : n)
      if (page > 1 && resData.length === 0) {
        setPage(1);
      }
    });
  };

  const [open, setOpen] = useState(false);

  const sidebarMenu = () => {
    setOpen(!open);
  };

  return (
    <div className='bg-stone-100'>

      <Carousel images={images} />
      <Drawer
        sidebar={<Sidebar setFilter={(e) => { setFilter(e) }} />}
        navbar={<SortBar setSort={(e) => { setSort(e) }} />}
      >
        <div className='px-2 py-4 relative'>
          <Grid childHeight={260} childWidth={200}>
            {products.map((item, index) => {
              return <Card key={index} data={item} />
            })}
          </Grid>
          <Pagination page={page} count={count} setPage={n => { setPage(n) }} />
        </div>
      </Drawer>
    </div>
  );
};

export default Home;
