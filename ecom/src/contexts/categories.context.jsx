import { useEffect, useState } from "react";
// import { useEffect } from "react";
import { createContext } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// import PRODUCTS from "../shop-data.js";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriessProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", PRODUCTS);
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const cat = await getCategoriesAndDocuments();
      setCategoriesMap(cat);
    };
    getData();
  }, []);
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
