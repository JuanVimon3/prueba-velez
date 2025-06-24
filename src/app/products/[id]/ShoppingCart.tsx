"use client";

import { useState, useEffect } from "react";
import { getCart, removeFromCart } from "../../../localStorage";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface CartItem {
  productId: string;
  productName: string;
  fullPrice?: number;
  quantity: number;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      setCartItems(cart);
    };

    const interval = setInterval(updateCart, 1000);
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      clearInterval(interval);
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.fullPrice) || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <>
      <IconButton
        color="primary"
        onClick={handleOpen}
        sx={{ ml: 2, mt: 1, mr: 2 }}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Carrito de compras</DialogTitle>
        <DialogContent>
          {cartItems.length === 0 ? (
            <DialogContentText>No hay productos en el carrito.</DialogContentText>
          ) : (
            <List>
              {cartItems.map((item) => {
                const price = Number(item.fullPrice) || 0;
                const subtotal = price * item.quantity;

                return (
                  <ListItem key={item.productId}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                      <Typography>
                        {item.productName ? `${item.productName} | ` : ""}
                        Cantidad: {item.quantity} | Precio: ${price} | Subtotal: ${subtotal}
                      </Typography>
                      <IconButton
                        onClick={() => handleRemove(item.productId)}
                        edge="end"
                        color="error"
                        aria-label="eliminar"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </ListItem>
                );
              })}
              <Typography align="right" sx={{ mt: 2 }}>
                <strong>Total: ${total}</strong>
              </Typography>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShoppingCart;
