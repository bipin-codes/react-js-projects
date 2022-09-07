import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // useEffect(() => {
  //   const callGoogleSignin = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   };
  //   callGoogleSignin();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user);
  // };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      {/* <button onClick={logGoogleRedirectUser}>
        Sign In with Google Redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};
export default SignIn;
