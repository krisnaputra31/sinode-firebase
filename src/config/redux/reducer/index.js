const initialState = {
  popup: false,
  isLogin: false,
  isLoading: false,
  errorMessage: "",
  user: " JJ",
};

const reducer = (state = initialState, action) => {
  if (action.type === "CHANGE_ERROR_MESSAGE") {
    return {
      ...state,
      errorMessage: action.value,
    };
  }
  if (action.type === "CHANGE_LOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  if (action.type === "CHANGE_USERNAME") {
    return {
      ...state,
      user: action.value,
    };
  }
  return state;
  // switch (reducer.type) {
  //   case "popup":
  //     return {
  //       ...state,
  //       popup: action.value,
  //     };
  //   case "isLogin":
  //     return {
  //       ...state,
  //       isLogin: action.value,
  //     };
  //   case "changeUsername":
  //     return {
  //       ...state,
  //       user: action.value,
  //     };
  //   case "CHANGE_ERROR_MESSAGE":
  //     return {
  //       ...state,
  //       errorMessage: action.value,
  //     };
  //   case "CHANGE_LOADING":
  //     return {
  //       ...state,
  //       isLoading: action.value,
  //     };
  //   default:
  //     return state;
  // }
};

export default reducer;
