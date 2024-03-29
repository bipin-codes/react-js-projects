import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../utils/store/user/user.action";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormFields = () => {
    setFormFields({
      email: "",
      password: "",
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          alert("Incorrect password!");
          break;
        case "auth/user-not-found":
          alert("No such user found");
          break;
        default:
          console.log(e);
      }
    }
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>

      <span>Sign up with Email and Password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label={"email"}
          type={"email"}
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label={"password"}
          type={"password"}
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType={BUTTON_TYPES_CLASSES.base}>
            Sign In
          </Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPES_CLASSES.google}
          >
            Google SignIn
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
