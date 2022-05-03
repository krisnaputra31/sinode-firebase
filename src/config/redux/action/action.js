import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";

export const changeUser = () => (dispatch) => {
  dispatch({ type: "CHANGE_USERNAME", value: "Jelvin Krisna Putra" });
};

export const registerUserAPI = (data) => (dispatch) => {
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  dispatch({ type: "CHANGE_LOADING", value: true });
  return createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // const user = userCredential.user;
      dispatch({ type: "CHANGE_LOADING", value: false });
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message.split(" ").slice(1, -1).join(" ");
      dispatch({ type: "CHANGE_ERROR_MESSAGE", value: errorMessage });
      dispatch({ type: "CHANGE_LOADING", value: false });
    });
};
