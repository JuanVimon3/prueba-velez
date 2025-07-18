"use client";

export interface CartItem {
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

const updateCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

export function removeFromCart(productId: string) {
  const cart = getCart().filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export { addToCart, getCart, updateCart };
