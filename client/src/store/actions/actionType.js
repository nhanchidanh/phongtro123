const actionTypes = {
  LOGIN: "LOGIN",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",

  GET_POSTS: "GET_POSTS",
  GET_POSTS_LIMIT: "GET_POSTS_LIMIT",
  GET_POSTS_LIMIT_BY_USER_ID: "GET_POSTS_LIMIT_BY_USER_ID",
  GET_NEW_POSTS: "GET_NEW_POSTS",
  EDIT_DATA: "EDIT_DATA",

  GET_CATEGORIES: "GET_CATEGORIES",
  GET_PRICE_RANGES: "GET_PRICE_RANGES",
  GET_AREA_RANGES: "GET_AREA_RANGES",
  GET_PROVINCES: "GET_PROVINCES",

  //USER
  GET_CURRENT_USER: "GET_CURRENT_USER",

  ADD_FAVORITE: "ADD_FAVORITE",
  REMOVE_FAVORITE: "REMOVE_FAVORITE",
  GET_FAVORITE_BY_USER_ID: "GET_FAVORITE_BY_USER_ID",
};

export default actionTypes;
