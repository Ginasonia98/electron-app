/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const getUserByUid = async (uid) => {
  const q = query(collection(database, 'accounts'), where('uid', '==', uid));
  const docs = await getDocs(q);
  let userData = {};
  docs.docs.forEach((doc) => {
    userData = doc.data();
  });
  return userData;
};

const registerWithEmailAndPassword = async (data) => {
  const { username, password, email, phone, role, fullName, address } = data;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(database, 'accounts'), {
      uid: user.uid,
      username,
      fullName,
      role,
      authProvider: 'local',
      email,
      phone,
      address,
    });
    return user;
  } catch (err) {
    // console.error(err);
    return err;
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    // console.error(err);
    return err;
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  database,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  getUserByUid,
  logout,
  storage,
};
