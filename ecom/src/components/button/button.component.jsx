// Inverted
// Default
// SignIn

import React from "react";
import "./button.styles.scss";
const BUTTON_TYPES_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container`} {...otherProps}>
      {children}
    </button>
  );
};
export default Button;
