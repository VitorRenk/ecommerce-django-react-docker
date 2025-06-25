import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Rating from "./Rating";

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Product({ product }) {
  // Monta a URL completa da imagem
  const imageUrl = `${BACKEND_URL}${product.image}`;

  return (
    <Paper sx={{ maxWidth: 345, margin: "5px" }}>
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", maxHeight: 140 }}
          image={imageUrl}
          alt={product.name}
        />
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            component="div"
          >
            <Rating
              value={product.rating}
              text={`${product.numReviews} Avaliações`}
              color="#f8e825"
            />
          </Typography>
          <Typography variant="h6" component="div">
            R${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default Product;
