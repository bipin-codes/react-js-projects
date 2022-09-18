import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../utils/store/cart/cart.action";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../utils/store/cart/cart.selector";
import { CartIconContainer, ItemCount, ShoppingIc } from "./cart-icon.styles";
import "./cart-icon.styles.jsx";

const CartIcon = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIc />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};
export default CartIcon;
