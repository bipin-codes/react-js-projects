import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

const { createContext, useState, useEffect } = require("react");

//value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
//provider -> Component

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //initial value for state
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
