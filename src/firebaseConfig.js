// firebaseConfig.js (Confessions DB)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0yn28W0Cd25DEFkYV4fSndMoQLSb0mo0",
  authDomain: "confession-app-d0966.firebaseapp.com",
  projectId: "confession-app-d0966",
  storageBucket: "confession-app-d0966.appspot.com", // ✅ fixed typo
  messagingSenderId: "29040729088",
  appId: "1:29040729088:web:1efceb8f664fac54230ce5",
};

const confessionsApp = initializeApp(firebaseConfig, "confessions");

const confessionsDB = getFirestore(confessionsApp);
const confessionsStorage = getStorage(confessionsApp);

export { confessionsDB, confessionsStorage };
