// fBase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

 // 파이어베이스 데이터베이스를 사용하기 위해 import 함

const firebaseConfig = {
apiKey: process.env.REACT_APP_API_KEY,
authDomain: process.env.REACT_APP_AUTH_DOMAIN,
projectId: process.env.REACT_APP_PROJECT_ID,
storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig); // eslint-disable-line no-unused-vars

export const auth = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
