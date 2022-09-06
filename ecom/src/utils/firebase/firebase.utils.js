// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDoc, setDoc, getFirestore, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATXLpXvoS-tcOJC5yrtUTKvb9hfnrjCYM",
  authDomain: "e-com-1b03b.firebaseapp.com",
  projectId: "e-com-1b03b",
  storageBucket: "e-com-1b03b.appspot.com",
  messagingSenderId: "762005894220",
  appId: "1:762005894220:web:6930ba385961f4f28370e9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid); //we get back reference to the userDoc with provided unique id
  const userSnapshot = await getDoc(userDocRef); //check if this user Document Reference already exists.

  //check if user data exists just return
  //otherwise, create new user in the collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (e) {
      console.log(`Error creating user ${e}`);
    }
  }
  return userDocRef; //if user already exists
};
