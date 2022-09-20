import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSucess,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

//Saga runs agains Actions

export function* fetchCategoriesAsyc() {
  try {
    //call-> convert function into an effect
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    //put is generator version of dispatch()
    yield put(fetchCategoriesSucess(categoriesArray));
  } catch (e) {
    yield put(fetchCategoriesFailed(e));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsyc
  );
}

export function* categoriesSaga() {
  //run everything inside and complete when everything completes
  yield all([call(onFetchCategories)]);
}
