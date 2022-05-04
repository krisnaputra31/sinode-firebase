import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import app from "../../firebase";

export const changeUser = () => (dispatch) => {
  dispatch({ type: "CHANGE_USERNAME", value: "Jelvin Krisna Putra" });
};

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    dispatch({ type: "CHANGE_LOADING", value: true });
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // const user = userCredential.user;
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ERROR_MESSAGE", value: "" });
        resolve(true);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message.split(" ").slice(1, -1).join(" ");
        dispatch({ type: "CHANGE_ERROR_MESSAGE", value: errorMessage });
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    dispatch({ type: "CHANGE_LOADING", value: true });
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user.auth.currentUser;
        console.log(user);
        const newUser = {
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
          refreshToken: user.stsTokenManager.refreshToken,
        };
        dispatch({ type: "CHANGE_ERROR_MESSAGE", value: "" });
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_IS_LOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: newUser });
        resolve(newUser);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message.split(" ").slice(1, -1).join(" ");
        dispatch({ type: "CHANGE_ERROR_MESSAGE", value: errorMessage });
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_IS_LOGIN", value: false });
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  const db = getDatabase();
  push(ref(db, "notes/" + data.userId), {
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const getDataFromApi = (uid) => (dispatch) => {
  const db = getDatabase();
  const starCountRef = ref(db, "notes/" + uid);
  return new Promise((resolve, reject) => {
    onValue(starCountRef, (snapshot) => {
      const data = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });
        dispatch({ type: "SET_NOTES", value: data });
      }
    });
  });
};

export const putDataToApi = (data) => (dispatch) => {
  const db = getDatabase();
  const starCountRef = ref(db, "notes/" + data.userId + "/" + data.noteId);
  return new Promise((resolve, reject) => {
    set(starCountRef, {
      title: data.title,
      content: data.content,
      date: data.date,
    })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
};

export const deleteDataFromApi = (data) => (dispatch) => {
  const db = getDatabase();
  const starCountRef = ref(db, "notes/" + data.userId + "/" + data.noteId);
  return new Promise((resolve, reject) => {
    remove(starCountRef);
  });
};
