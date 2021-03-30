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
  loadedCategoriesAndSubcategories
) => ({
  type: ActionTypes.CATEGORIES_AND_SUBCATEGORIES_LOADED,
  payload: loadedCategoriesAndSubcategories,
});

// MAP

export const postSubcategoryMap = (id, value) => (dispatch) => {
  const newSubcategoryMap = {
    id: id,
    value: value,
  };

  dispatch(addSubcategoriesMap(newSubcategoryMap));
};

export const addSubcategoriesMap = (subcategoryMap) => ({
  type: ActionTypes.ADD_SUBCATEGORIES_MAP,
  payload: subcategoryMap,
});

export const postSubcategoryMapCharge = (id) => (dispatch) => {
  dispatch(addSubcategoriesMapCharge(id));
};

export const addSubcategoriesMapCharge = (id) => ({
  type: ActionTypes.SUBCATEGORIES_MAP_CHARGE,
  payload: id,
});

export const fetchDataPoints = (idSubcategory) => (dispatch) => {
  return axios
    .get("kappa/data/lookup/subcategory/" + idSubcategory)
    .then((response) => dispatch(loadedDataPoints(response.data)))
    .catch((error) => dispatch(dataPointsFailed(error.message)));
};

export const dataPointsFailed = (errmess) => ({
  type: ActionTypes.DATA_POINTS_FAILED,
  payload: errmess,
});

export const loadedDataPoints = (loadedDataPoints) => ({
  type: ActionTypes.DATA_POINTS_LOADED,
  payload: loadedDataPoints,
});
