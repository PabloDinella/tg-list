const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects
const escapeString = require('escape-string-regexp');
const data = require("../output/entries-normalized.json");

firebase.initializeApp({
  apiKey: "AIzaSyAi1KlX6q2P3Be3M1gvwt-fLlwg0G7e53A",
  authDomain: "tg-list.firebaseapp.com",
  databaseURL: "https://tg-list.firebaseio.com",
  projectId: "tg-list",
  storageBucket: "tg-list.appspot.com",
  messagingSenderId: "983638119768"
});

var db = firebase.firestore();

function encode(decoded) {
  return encodeURIComponent(decoded).replace(/\./g, '%2E')
}

function decode(encoded) {
  return decodeURIComponent(encoded.replace('%2E', '.'))
}

db.collection('tags').get()
  .then(snapshot => {
      snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
      });
  })
  .catch(err => {
      console.log('Error getting documents', err);
  });

//
// data && Object.keys(data).forEach((key, i) => {
//   if (i > 0) {
//     return
//   }
//
//   const nestedContent = data[key];
//
//   if (typeof nestedContent === "object") {
//     Object.keys(nestedContent).forEach(docTitle => {
//       db
//       .collection('tags')
//       .doc(encode(key))
//       .collection('chats')
//       .doc(encode(docTitle))
//       .set(nestedContent[docTitle])
//       .then((res) => {
//         console.log("Document successfully written!");
//       })
//       .catch((error) => {
//         console.error("Error writing document: ", error);
//       });
//     });
//   }
// });
