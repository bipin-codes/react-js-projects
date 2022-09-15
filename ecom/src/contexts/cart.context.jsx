import { useReducer } from "react";
import { createContext } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const itemToRemove = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );
  if (itemToRemove.quantity === 1) {
    return cartItems.filter((x) => x.id !== itemToRemove.id);
  }
  return cartItems.map((cartItem) => {
    return cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((x) => x.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CART_REDUCER_ACTIONS = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_STATUS: "SET_CART_STATUS",
};
const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_REDUCER_ACTIONS.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_REDUCER_ACTIONS.SET_CART_STATUS:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled Error ${type} in Cart Context!`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const addItemToCart = (productToAdd) => {
    const updatedCart = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(updatedCart);
  };
  const removeItemFromCart = (cartItemToRemove) => {
    const updatedCart = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemReducer(updatedCart);
  };
  const clearItemFromCart = (cartItemToRemove) => {
    const updatedCart = clearCartItem(cartItems, cartItemToRemove);
    updateCartItemReducer(updatedCart);
  };
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_REDUCER_ACTIONS.SET_CART_STATUS, bool));
  };

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    const newCartTotal = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    dispatch(
      createAction(CART_REDUCER_ACTIONS.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const val = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={val}>{children}</CartContext.Provider>;
};
