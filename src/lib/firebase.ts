// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else if (getApps().length) {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
}


// This is a guard to ensure you don't use these on the server.
// If you need server-side Firebase, use the Admin SDK.
const getSafeAuth = () => {
    if (typeof window === 'undefined') {
        // This is a mock or minimal version for SSR builds, it won't be functional.
        return {} as Auth; 
    }
    if (!auth) {
        app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        auth = getAuth(app);
    }
    return auth;
}

const getSafeDb = () => {
    if (typeof window === 'undefined') {
        return {} as Firestore;
    }
     if (!db) {
        app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
    return db;
}


export { getSafeAuth, getSafeDb, app, auth, db };