 import firebase from 'firebase';
 require('@firebase/firestore')
 var firebaseConfig = {
    apiKey: "AIzaSyAQVB-Uw1nK5ip3b8nJzeydh7pwWWw3Twg",
    authDomain: "booksantaapp-7caba.firebaseapp.com",
    projectId: "booksantaapp-7caba",
    storageBucket: "booksantaapp-7caba.appspot.com",
    messagingSenderId: "423539175912",
    appId: "1:423539175912:web:9f1b4bc2d466381ead345d"
  };
  // Initialize Firebase  
  firebase.initializeApp(firebaseConfig);       
  export default firebase.firestore();        