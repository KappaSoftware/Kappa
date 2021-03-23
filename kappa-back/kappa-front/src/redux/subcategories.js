import * as ActionTypes from "./ActionTypes";

export const SubcategoriesMap = (state = { subcategoriesMap: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SUBCATEGORIES_MAP:
      var subcategoryMap = action.payload;
      return {
        ...state,
        subcategoriesMap: state.subcategoriesMap.concat(subcategoryMap),
      };
    default:
      return state;
  }
};
