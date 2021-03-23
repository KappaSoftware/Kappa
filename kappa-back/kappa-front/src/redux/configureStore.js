import { createStore, combineReducers, applyMiddleware } from "redux";
import { CategoriesAndSubcategories } from "./categoriesAndSubcategories";
import { SubcategoriesMap } from "./subcategories";

import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      categoriesAndSubcategories: CategoriesAndSubcategories,
      subcategoriesMap: SubcategoriesMap,
    }),
    applyMiddleware(thunkMiddleware, logger)
  );

  return store;
};
