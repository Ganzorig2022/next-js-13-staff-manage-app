// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'staff-manage-app-6b2b5.firebaseapp.com',
  projectId: 'staff-manage-app-6b2b5',
  storageBucket: 'staff-manage-app-6b2b5.appspot.com',
  messagingSenderId: '624593678469',
  appId: '1:624593678469:web:f3da3e710318373f1039ec',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
