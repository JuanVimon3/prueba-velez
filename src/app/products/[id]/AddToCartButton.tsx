"use client";

import { addToCart } from "../../../localStorage";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  fullPrice: number;
}

const AddToCartButton = ({ productId, productName, fullPrice }: AddToCartButtonProps) => {
  const handleAddToCart = () => {
    const itemToAdd = {
      productId,
      productName,
      fullPrice,
      quantity: 1,
    };
    addToCart(itemToAdd);;
  };

  return (
    <button
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleAddToCart}
    >
      Agregar al carrito
    </button>
  );
};

export default AddToCartButton;
