"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";

interface Product {
  productId: string;
  productName: string;
  items: {
    images: {
      imageUrl: string;
    }[];
  }[];
}

async function fetchSimilarProducts(currentProductId: string): Promise<Product[]> {
  const res = await fetch("https://api-prueba-frontend.onrender.com/api/products", {
    cache: "no-store",
  });
  const allProducts: Product[] = await res.json();

  return allProducts
    .filter((product) => product.productId !== currentProductId)
    .slice(0, 3);
}

export default function SimilarProducts({ productId }: { productId: string }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchSimilarProducts(productId).then(setProducts);
  }, [productId]);

  if (products.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={5}>
      <Typography variant="h5" component="h2" gutterBottom>
        Productos similares
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products.map((product, index) => {
          const imageUrl = product.items[0]?.images?.[0]?.imageUrl;

          return (
            <Grid item xs={12} sm={4} key={product.productId}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Link href={`/products/${product.productId}`}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    {imageUrl && (
                      <CardMedia
                        component="img"
                        height="180"
                        image={imageUrl}
                        alt={product.productName}
                        sx={{ maxWidth: 250, mx: "auto", borderRadius: 2 }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="subtitle1" component="p" fontWeight="bold">
                        {product.productName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
