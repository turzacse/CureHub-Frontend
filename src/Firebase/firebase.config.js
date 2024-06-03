import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDGV5Djxxi_qi-5OO-FCNmmFGCSDHnV6_Y",
  authDomain: "curehub.firebaseapp.com",
  projectId: "curehub",
  storageBucket: "curehub.appspot.com",
  messagingSenderId: "299522463225",
  appId: "1:299522463225:web:925895b1706e777f111928"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);