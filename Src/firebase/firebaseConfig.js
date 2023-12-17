import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseStore from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCEzycpzul3Pi_zh6caTbenG7uGfIFlSmQ",
  authDomain: "lab5-43818.firebaseapp.com",
  projectId: "lab5-43818",
  storageBucket: "lab5-43818.appspot.com",
  messagingSenderId: "435371860899",
  appId: "1:435371860899:web:4bd2f9cc05350f05363016",
  measurementId: "G-S5J0YNQBVK"
};

if (!firebaseStore.apps.length) {
  firebaseStore.initializeApp(firebaseConfig);
}
export { firebaseStore };
export const FIRE_BASE_EXPO_APP = initializeApp(firebaseConfig);
export const FIRE_BASE_AUTH = getAuth(FIRE_BASE_EXPO_APP);
