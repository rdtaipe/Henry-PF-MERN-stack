import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../Components/ProductCard";
import { Box, Container, Stack, Typography } from "@mui/material";

const Products = () => {
  const [bestproducts, setBestproducts] = useState();
  const [whitoutstock, setWhitoutstock] = useState();

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
  useEffect(() => {
    fetchUsersGenres();
    fetchWhitoutStock();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography>Best valued:</Typography>
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={3}>
        {bestproducts && bestproducts.map((el) => <ProductCard product={el} />)}
      </Stack>
      {whitoutstock && whitoutstock.length < 0 ? (
        whitoutstock.map((el) => <ProductCard product={el} />)
      ) : (
        <Typography>No hay productos sin Stock</Typography>
      )}
    </Container>
  );
};

export default Products;
