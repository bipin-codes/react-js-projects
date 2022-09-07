import React from "react";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
const SignUpForm = () => {
  const [formFields, setFormFields] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormFields = () => {
    setFormFields({
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const result = await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") alert("Already in use");
      console.log(e);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>

      <span>Sign up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display name"}
          type={"text"}
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label={"Confirm Password"}
          type={"password"}
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
