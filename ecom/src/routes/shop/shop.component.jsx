import "./shop.styles.scss";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import { Route, Routes } from "react-router-dom";
import Category from "../category/category.component";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../utils/store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const getData = async () => {
    //   const categories = await getCategoriesAndDocuments();

    //   dispatch(setCategories(categories));
    // };
    // getData();
    // dispatch(fetchCategoriesAsync());

    dispatch(fetchCategoriesStart());
  });

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  );
};
export default Shop;
