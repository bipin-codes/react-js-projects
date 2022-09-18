import "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../utils/store/cart/cart.selector.js";
const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        ) : (
          <EmptyMessage>Your cart is Empty!</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler} bu>
        GO TO CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
};
export default CartDropDown;
