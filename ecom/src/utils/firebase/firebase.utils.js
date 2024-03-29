// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDoc,
  setDoc,
  getFirestore,
  doc,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { collection } from "firebase/firestore";
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

//Google Provider, there are others as well.
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); //Singleton authentication instance

// Export methods with required provider
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additional) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid); //we get back reference to the userDoc with provided unique id
  const userSnapshot = await getDoc(userDocRef); //check if this user Document Reference already exists.

  //check if user data exists just return
  //otherwise, create new user in the collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additional,
      });
    } catch (e) {
      console.log(`Error creating user ${e}`);
    }
  }
  return userSnapshot; //if user already exists
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// upload JSON file to the firebase.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());
};

export const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        res(userAuth);
      },
      rej
    );
  });
};
