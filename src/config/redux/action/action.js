import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";

const asuu = () => {
  return { type: "CHANGE_ERROR_MESSAGE", value: "halooo" };
};

export const registerUserAPI = (data) => (dispatch) => {
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  console.log(dispatch({ type: "CHANGE_LOADING", value: true }));
  dispatch({ type: "CHANGE_LOADING", value: true });
  return createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // const user = userCredential.user;
      dispatch({ type: "CHANGE_LOADING", value: false });
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message.split(" ").slice(1, -1).join(" ");
      console.log(errorMessage);
      dispatch(asuu());

      dispatch({ type: "CHANGE_LOADING", value: false });
    });
};
