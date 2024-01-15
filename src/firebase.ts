// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBMis_gmKCG3SjGO_gM82hCrGRuB1GUga8',
  authDomain: 'social-network-service.firebaseapp.com',
  projectId: 'social-network-service',
  storageBucket: 'social-network-service.appspot.com',
  messagingSenderId: '308803703774',
  appId: '1:308803703774:web:ac04c5e6dc9404ae86c34f',
  measurementId: 'G-9ZK8ZLJP73',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
