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
  categoryId: string;
  items: {
    images: {
      imageUrl: string;
    }[];
  }[];
}

async function fetchProductsFromLocalJSON(): Promise<Product[]> {
  try {
    const res = await fetch("/mockProducts.json");
    if (!res.ok) {
      throw new Error(`Error al cargar los productos: ${res.statusText}`);
    }
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching mock products from public directory:", error);
    return [];
  }
}

export default function SimilarProducts({ productId, categoryId }: { productId: string; categoryId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSimilarProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProductsFromLocalJSON();
        const categoryProducts = allProducts
          .filter((product) => product.categoryId === categoryId && product.productId !== productId)
          .sort(()=>0.5-Math.random());


        const similarProds = categoryProducts.slice(0, 3);

        setProducts(similarProds);
      } catch (err) {
        console.error("Error fetching similar products:", err);
        setError("No se pudieron cargar productos similares.");
      } finally {
        setLoading(false);
      }
    };

    loadSimilarProducts();
  }, [productId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box mt={5}>
        <Typography variant="h5" component="h2" gutterBottom>
          Productos similares
        </Typography>
        <Typography>No se encontraron productos similares.</Typography>
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
                <Link href={`/products/${product.productId}`} passHref>
                  <Card
                    component="div"
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                      },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {imageUrl && (
                      <CardMedia
                        component="img"
                        height="180"
                        image={imageUrl}
                        alt={product.productName}
                        sx={{ maxWidth: 250, mx: "auto", borderRadius: 2, pt: 2 }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}> { }
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