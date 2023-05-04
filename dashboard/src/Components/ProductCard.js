import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";


const ProductCard = ({ product,string,dato }) => {
  return (
    <Card sx={{ maxWidth: 120 }}>
      <CardActionArea>
        <a href="http://www.google.com" target="_blank">
          <CardMedia
            component="img"
            height="100"
            image={product.image[0]}
            alt={product.name}
          />
          <CardContent>
            <Typography fontSize={15} variant="p" component="div">
              {product.name}
            </Typography>
            <Typography
              fontSize={15}
              variant="p"
              component="div"
              color={"blue"}
            >
              {dato} {string}
            </Typography>
          </CardContent>
        </a>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
