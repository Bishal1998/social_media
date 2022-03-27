import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";



const firebaseConfig = {

  apiKey: "AIzaSyAMEtUgaZT3-n9hYy-2tgBkQA8Chex9wIA",

  authDomain: "social-media-a1e81.firebaseapp.com",

  projectId: "social-media-a1e81",

  storageBucket: "social-media-a1e81.appspot.com",

  messagingSenderId: "606911488075",

  appId: "1:606911488075:web:dab149e4e138ae06fc6dce",

  measurementId: "G-MKVTDHKHD0"

};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);