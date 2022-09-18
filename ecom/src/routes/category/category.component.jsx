import { Fragment, useEffect } from "react";
import { useState } from "react";
// import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../utils/store/categories/categories.selector";
// import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";
const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    console.log("categories changed!");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => {
            return (
              <ProductCard product={product} key={product.id}></ProductCard>
            );
          })}
      </div>
    </Fragment>
  );
};
export default Category;
