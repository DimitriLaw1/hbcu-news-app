// firebase.js (News DB)
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpxt_uYK_jNPFUrF0pYo8H2ZIeZ0kDXDw",
  authDomain: "news-form-web.firebaseapp.com",
  projectId: "news-form-web",
  storageBucket: "news-form-web.appspot.com",
  messagingSenderId: "794262795879",
  appId: "1:794262795879:web:fad4991b5fa4c5a8b106c2",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const newsDB = getFirestore(app);
const newsStorage = getStorage(app);

export { newsDB, newsStorage };
