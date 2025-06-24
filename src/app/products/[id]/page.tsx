"use client";

import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import SimilarProducts from "./SimilarProducts";
import ShoppingCart from "./ShoppingCart";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Product {
  productId: string;
  productName: string;
  metaTagDescription: string;
  brand: string;
  productReference: string;
  categoryId: string;
  items: {
    images: { imageUrl: string }[];
    sellers: { commertialOffer: { FullSellingPrice: number } }[];
    Color?: string[];
    Talla?: string[];
  }[];
}

export default function Page() {
  const params = useParams();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/mockProducts.json");
        if (!res.ok) throw new Error(`Error al cargar los productos: ${res.statusText}`);
        const data: Product[] = await res.json();
        setProducts(data);
        console.log('extensión', data.length)
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-8 text-xl">Cargando productos...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (!products) return <p>No hay datos de productos disponibles.</p>;

  const product = products.find((p) => p.productId === params.id);
  if (!product) return <p>Producto no encontrado</p>;

  const item = product.items[0];
  const fullPrice = item?.sellers?.[0]?.commertialOffer?.FullSellingPrice ?? 0;
  const imageUrl = item?.images?.[0]?.imageUrl;

  return (
    <div className="relative p-6 min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-background">
      <div className="fixed top-80 right-4 z-50">
        <ShoppingCart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="flex justify-center">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.productName}
              width={500}
              height={500}
              className="rounded-xl shadow-lg object-contain bg-white"
            />
          )}
        </div>

        <div className="flex flex-col justify-start space-y-4 text-left">
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="text-lg">{product.metaTagDescription}</p>
          <p className="text-lg">Marca: {product.brand}</p>
          <p className="text-lg">Referencia: {product.productReference}</p>
          <p className="text-lg">Color: {item?.Color?.join(", ") || "N/A"}</p>
          <p className="text-lg">Talla: {item?.Talla?.join(", ") || "N/A"}</p>
          <p className="text-2xl text-green-700 font-semibold">
            Precio: {fullPrice > 0 ? `$${fullPrice}` : "No disponible"}
          </p>

          <div className="flex justify-center md:justify-start mt-6">
            <Image
              src="/LOGO_MARCA_VÉLEZ.png"
              alt="Logo Vélez"
              width={200}
              height={200}
              className="rounded-xl shadow-md object-contain"
            />
          </div>

          {fullPrice > 0 && (
            <div className="mt-4">
              <AddToCartButton
                productId={product.productId}
                productName={product.productName}
                fullPrice={fullPrice}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <SimilarProducts productId={product.productId} categoryId={product.categoryId} />
      </div>
    </div>
  );
}
