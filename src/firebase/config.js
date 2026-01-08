import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVlrorN22LaFh2C9EnGFBQIlm_yW9icN4",
  authDomain: "mineblog-c9c4b.firebaseapp.com",
  projectId: "mineblog-c9c4b",
  storageBucket: "mineblog-c9c4b.appspot.com",
  messagingSenderId: "107105529904",
  appId: "1:107105529904:web:1c7747f00878e261f93df5",
  measurementId: "G-E2JEV8T06B",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
