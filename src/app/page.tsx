'use client';

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
  TextField
} from "@mui/material";

interface Product {
  productId: string;
  productName: string;
  categoryId: string;
  items: {
    images: {
      imageUrl: string;
    }[];
    sellers: {
      commertialOffer: {
        FullSellingPrice: number;
      };
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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProductsFromLocalJSON();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  const filteredProducts = products.filter((product) =>
  product.productName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <section className="relative w-full h-[250px]">
         <video
          src="/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-semibold text-center px-2 drop-shadow-lg leading-snug">
            Productos hechos a mano,<br />
            uno a uno, con alma y con historia
          </h1>
       </div>
      </section>
      <Box mt={5} px={4}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Catálogo de Productos
      </Typography>

      <Box mb={4} display="flex" justifyContent="center">
      <TextField
        label="Buscar productos"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: '100%', maxWidth: 400 }}
      />
     </Box>


      <Grid container spacing={4} justifyContent="center">
        {filteredProducts.map((product, index) => {
          const item = product.items[0];
          const imageUrl = item?.images?.[0]?.imageUrl || "";
          const price = item?.sellers?.[0]?.commertialOffer?.FullSellingPrice ?? 0;

          return (
            <Grid component='div' key={product.productId}>
               <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ width: "100%", maxWidth: 280 }}
              >
                <Link href={`/products/${product.productId}`} passHref>
                  <Card
                    sx={{
                      height: 250,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
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
                        image={imageUrl}
                        alt={product.productName}
                        sx={{
                          height: 180,
                          objectFit: "contain",
                          p: 2,
                          borderRadius: 2,
                        }}
                      />
                    )}

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {product.productName}
                      </Typography>
                      <Typography variant="body1" color="green">
                        {price > 0 ? `$${price}` : "No disponible"}
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
    </>   
  );
}
