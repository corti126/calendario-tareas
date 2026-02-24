// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Base de datos
import { getAuth } from "firebase/auth";           // Autenticación

const firebaseConfig = {
  apiKey: "AIzaSyBk6RRgnWKxuMIxgusCYGnG3q1ezEgIBmA",
  authDomain: "calendario-y-tareas.firebaseapp.com",
  projectId: "calendario-y-tareas",
  storageBucket: "calendario-y-tareas.firebasestorage.app",
  messagingSenderId: "632774631716",
  appId: "1:632774631716:web:2f92b3f534d631fd9a5bb1",
  measurementId: "G-6XZ711H5Z9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios para usarlos en tus componentes
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;