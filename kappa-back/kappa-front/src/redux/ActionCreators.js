import axios from "axios";
import * as ActionTypes from "./ActionTypes";

export const fetchCategoriesAndSubcategories = () => (dispatch) => {
  dispatch(categoriesAndSubcategoriesLoading(true));

  return axios
    .get("kappa/categories/lookup/subcategory")
    .then((response) =>
      dispatch(loadedCategoriesAndSubcategories(response.data))
    )
    .catch((error) =>
      dispatch(categoriesAndSubcategoriesFailed(error.message))
    );
};

export const categoriesAndSubcategoriesLoading = () => ({
  type: ActionTypes.CATEGORIES_AND_SUBCATEGORIES_LOADING,
});

export const categoriesAndSubcategoriesFailed = (errmess) => ({
  type: ActionTypes.CATEGORIES_AND_SUBCATEGORIES_FAILED,
  payload: errmess,
});

export const loadedCategoriesAndSubcategories = (
  categoriesAndSubcategoriesLoading
) => ({
  type: ActionTypes.CATEGORIES_AND_SUBCATEGORIES_LOADED,
  payload: categoriesAndSubcategoriesLoading,
});

// MAP

export const postSubcategoryMap = (id, value) => (dispatch) => {
  const newSubcategoryMap = {
    [id]: value,
  };

  dispatch(addSubcategoriesMap(newSubcategoryMap));
};

export const addSubcategoriesMap = (subcategoryMap) => ({
  type: ActionTypes.ADD_SUBCATEGORIES_MAP,
  payload: subcategoryMap,
});
