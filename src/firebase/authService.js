import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config.js";

export const registerUser = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, {
    displayName: name?.trim(),
  });

  const token = await userCredential.user.getIdToken();
  return {
    token,
    user: {
      name: userCredential.user.displayName,
      email: userCredential.user.email,
    },
  };
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const token = await userCredential.user.getIdToken();
  console.log("LOGIN DISPLAY NAME:", userCredential.user.displayName);
  return {
    token,
    user: {
      name: userCredential.user.displayName,
      email: userCredential.user.email,
    },
  };
};

export const logoutUser = async () => {
  await signOut(auth);
};
