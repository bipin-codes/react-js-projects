import { createAction } from "../../reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// export const setCategories = (categoriesArray) =>
//   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesSucess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, error);

//thunk function that returns a function that gets a dispatch
//THIS ISN'T BEING USED AFTER SAGAS INTRODUCTION AS THAT IS NOW USED TO CALL APIs
// export const fetchCategoriesAsync = () => {
//   return async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//       const data = await getCategoriesAndDocuments("categories");
//       dispatch(fetchCategoriesSucess(data));
//     } catch (e) {
//       dispatch(fetchCategoriesFailed(e));
//     }
//   };
// };
