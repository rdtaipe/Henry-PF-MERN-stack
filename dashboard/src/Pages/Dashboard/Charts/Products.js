import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../Components/ProductCard";
import { Box, Container, Stack, Typography } from "@mui/material";

const Products = () => {
  const [bestproducts, setBestproducts] = useState();
  const [whitoutstock, setWhitoutstock] = useState();
  const [moresold, setMoreSold] = useState();

  function fetchUsersGenres() {
    axios.get(`http://localhost:5000/stats/bestproducts`).then((res) => {
      setBestproducts(res.data);
    });
  }
  function fetchWhitoutStock() {
    axios.get(`http://localhost:5000/stats/whitoutstock`).then((res) => {
      setWhitoutstock(res.data);
    });
  }
  function fetchMoreSold() {
    axios.get(`http://localhost:5000/stats/moresold`).then((res) => {
      setMoreSold(res.data);
    });
  }

  useEffect(() => {
    fetchUsersGenres();
    fetchWhitoutStock();
    fetchMoreSold();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Box>
        <Typography>Best Valued:</Typography>
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={3}>
          {bestproducts &&
            bestproducts.map((el) => (
              <ProductCard product={el} string={"stars"} dato={el.stars} />
            ))}
        </Stack>
      </Box>

      <Box mt={5}>
        <Typography>More Sold:</Typography>
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={3}>
          {moresold &&
            moresold.map((el) => (
              <ProductCard product={el} string={"sold"} dato={el.total} />
            ))}
        </Stack>
      </Box>

      <Typography mt={5}>Without Stock:</Typography>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        mt={1}
        minHeight={100}
      >
        {whitoutstock && whitoutstock.length < 0 ? (
          whitoutstock.map((el) => <ProductCard product={el} />)
        ) : (
          <Typography ml={5}>No hay productos sin Stock</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Products;
