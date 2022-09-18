import React from "react";
import { Outlet } from "react-router-dom";
import {
  LogoContainer,
  NavigationContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import { ReactComponent as Logo } from "../../assets/crown.svg";
// import { useContext } from "react";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
// import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../utils/store/user/user.selector";
import { selectIsCartOpen } from "../../utils/store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  // const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  return (
    <React.Fragment>
      <NavigationContainer>
        <LogoContainer to={"/"}>
          <Logo>Logo</Logo>
        </LogoContainer>
        <NavLinks>
          <NavLink to={"/Shop"}>Shop</NavLink>
          {currentUser ? (
            <NavLink as={"span"} onClick={signOutUser}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to={"/auth"}>Sign In</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </React.Fragment>
  );
};
export default Navigation;
