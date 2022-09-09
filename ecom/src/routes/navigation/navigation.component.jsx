import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./navigation.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  console.log(isCartOpen);
  return (
    <React.Fragment>
      <div className="navigation">
        <Link className="logo-container" to={"/"}>
          <Logo>Logo</Logo>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={"/Shop"}>
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
      {isCartOpen && <CartDropDown />}
      <Outlet />
    </React.Fragment>
  );
};
export default Navigation;
