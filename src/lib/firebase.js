import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBfUZl44WYNzKvksH1uksVigTFjUN9NP-s",
  authDomain: "clone-yt-bb70c.firebaseapp.com",
  projectId: "clone-yt-bb70c",
  storageBucket: "clone-yt-bb70c.appspot.com",
  messagingSenderId: "544330646524",
  appId: "1:544330646524:web:f6f2bbb077a551c9f0a879",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
