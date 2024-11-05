import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBJmKDJWjkdoJ68xQ5NYMCrI6CPyN0y8Eo",
    authDomain: "luntiangkamay-55fe2.firebaseapp.com",
    projectId: "luntiangkamay-55fe2",
    storageBucket: "luntiangkamay-55fe2.firebasestorage.app",
    messagingSenderId: "924433587276",
    appId: "1:924433587276:web:013638ff0fe441b65ee8e9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
