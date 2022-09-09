import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  console.log(cartItems, productToAdd);
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);
  if (existingItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  const result = [...cartItems, { ...productToAdd, quantity: 1 }];
  return result;
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const updatedCart = addCartItem(cartItems, productToAdd);
    console.log(updatedCart);
    setCartItems(updatedCart);
  };

  const val = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={val}>{children}</CartContext.Provider>;
};
