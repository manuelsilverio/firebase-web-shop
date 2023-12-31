// We use this object to Initialize Firebase app and retrieving the authentication object (auth)
import {initializeApp, getApps, getApp, FirebaseApp} from "firebase/app";
import {getAuth, signOut} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };
 

  const app = initializeApp(firebaseConfig);
  console.log("app is initialising");
  export const auth = getAuth(app);
  // auth.settings.appVerificationDisabledForTesting = true;
  export default app;
