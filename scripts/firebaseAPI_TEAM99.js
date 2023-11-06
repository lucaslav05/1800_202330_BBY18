//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {

    apiKey: "AIzaSyDWrZ1vtmlBxJVTdfV3ZuUarNhAttjRZcw",
    authDomain: "recycleroute-34470.firebaseapp.com",
    projectId: "recycleroute-34470",
    storageBucket: "recycleroute-34470.appspot.com",
    messagingSenderId: "867998236318",
    appId: "1:867998236318:web:9edbf2adbeb5d5bda2458f",
    measurementId: "G-RVR8EFQB19"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();