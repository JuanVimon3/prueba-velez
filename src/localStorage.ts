"use client";

interface CartItem {
  productId: string;
  productName: string;
  fullPrice: number;
  quantity: number;
}

const addToCart = (item: CartItem) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingIndex = cart.findIndex((p) => p.productId === item.productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export { addToCart, getCart };

