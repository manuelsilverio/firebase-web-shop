 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
 // import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
 import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js'
 import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCnPIjp6FDNBncHFX38cZGuGpQsrnW_Glc",
   authDomain: "fir-shop-pipeline.firebaseapp.com",
   projectId: "fir-shop-pipeline",
   storageBucket: "fir-shop-pipeline.appspot.com",
   messagingSenderId: "509505680619",
   appId: "1:509505680619:web:d24a8843a90ea3ea0cbaae",
   measurementId: "G-B6X3S3VG99"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const db = getFirestore(app);
 const auth = getAuth(app);