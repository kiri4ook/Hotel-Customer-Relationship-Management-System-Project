import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCwKhIWg9QkEnXTTKSceCgwMm7m4O0tdrE",
    authDomain: "hotel-management-project-310df.firebaseapp.com",
    databaseURL: "https://hotel-management-project-310df-default-rtdb.firebaseio.com",
    projectId: "hotel-management-project-310df",
    storageBucket: "hotel-management-project-310df.appspot.com",
    messagingSenderId: "722356397646",
    appId: "1:722356397646:web:7c6a1f5405c4f267e9851f"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;

