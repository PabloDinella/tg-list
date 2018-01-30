import googleFirebase from 'firebase'

const config = {
  apiKey: "AIzaSyAi1KlX6q2P3Be3M1gvwt-fLlwg0G7e53A",
  authDomain: "tg-list.firebaseapp.com",
  databaseURL: "https://tg-list.firebaseio.com",
  projectId: "tg-list",
  storageBucket: "tg-list.appspot.com",
  messagingSenderId: "983638119768"
};

const firebase = googleFirebase.initializeApp(config);

export default firebase
