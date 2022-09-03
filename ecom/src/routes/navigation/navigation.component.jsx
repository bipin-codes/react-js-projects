import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./navigation.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
const Navigation = () => {
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
          <Link className="nav-link" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};
export default Navigation;
