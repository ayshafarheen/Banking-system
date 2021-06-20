  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBLOptYXZvVcyymQsl334Q3-elK9VI16SM",
    authDomain: "banking-syste.firebaseapp.com",
    projectId: "banking-syste",
    storageBucket: "banking-syste.appspot.com",
    messagingSenderId: "574510563572",
    appId: "1:574510563572:web:fdb9385285941db4e51ea1",
    measurementId: "G-Q6RQ2DH061"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();