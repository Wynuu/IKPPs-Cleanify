import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBMGrCi02KlEzkijxEf8fH6GEZfkKUDbpA",
  authDomain: "ikpps-cleanify.firebaseapp.com",
  databaseURL: "https://ikpps-cleanify-default-rtdb.firebaseio.com",
  projectId: "ikpps-cleanify",
  storageBucket: "ikpps-cleanify.firebasestorage.app",
  messagingSenderId: "436494863043",
  appId: "1:436494863043:web:e0745b0b1a1d6ea202b076",
  measurementId: "G-XHW7XN0JK3"
};

const app = initializeApp(firebaseConfig);
// Ekspor layanan Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };