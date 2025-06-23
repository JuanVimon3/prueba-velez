"use client";

import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import SimilarProducts from "./SimilarProducts";
import ShoppingCart from "./ShoppingCart";

interface Product {
  productId: string;
  productName: string;
  metaTagDescription: string;
  brand: string;
  productReference: string;
  items: {
    images: { imageUrl: string }[];
    sellers: { commertialOffer: { FullSellingPrice: number } }[];
  }[];
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch("https://api-prueba-frontend.onrender.com/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();

  console.log("Lista completa de productos:", products);

  const product = products.find((p) => p.productId === params.id);
  if (!product) return <p>Producto no encontrado</p>;

  const item = product.items[0];
  const fullPrice = item?.sellers?.[0]?.commertialOffer?.FullSellingPrice ?? 0;
  const imageUrl = item?.images?.[0]?.imageUrl;

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.productName}
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-contain bg-white"
            />
          )}
          <h1 className="text-2xl font-bold mt-4">{product.productName}</h1>
          <p className="text-lg mt-1">{product.metaTagDescription}</p>
          <p className="text-lg mt-1">Marca: {product.brand}</p>
          <p className="text-lg mt-1">Referencia: {product.productReference}</p>
          <p className="text-lg mt-2 text-green-700 font-semibold">
            Precio: {fullPrice > 0 ? `$${fullPrice}` : "No disponible"}
          </p>
        </div>
        <ShoppingCart />
      </div>

      {fullPrice > 0 && (
        <AddToCartButton
          productId={product.productId}
          productName={product.productName}
          fullPrice={fullPrice}
        />
      )}

      <SimilarProducts productId={product.productId} />
    </div>
  );
}
