const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects
const slug = require('slug');
const escapeString = require('escape-string-regexp');
// const data = require("../output/entries-normalized.json");
const data = require("../output/entries.json");

firebase.initializeApp({
  apiKey: "AIzaSyAi1KlX6q2P3Be3M1gvwt-fLlwg0G7e53A",
  authDomain: "tg-list.firebaseapp.com",
  databaseURL: "https://tg-list.firebaseio.com",
  projectId: "tg-list",
  storageBucket: "tg-list.appspot.com",
  messagingSenderId: "983638119768"
});

var db = firebase.firestore();

addFlatten()

function encode(decoded) {
  return encodeURIComponent(decoded).replace(/\./g, '%2E')
}

function decode(encoded) {
  return decodeURIComponent(encoded.replace('%2E', '.'))
}

function printByTags() {
  db
    .collection('tags')
    .get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            // console.log(doc.collection('tags').get().then(sn => { console.log(sn.length);}));
            console.log(db.collection('tags').doc(doc.id).collection('chats').get().then(sn => { console.log(doc.id, '=>', sn.size); }));
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
}


function addNested() {
  data && Object.keys(data).forEach((key, i) => {
    // if (i > 1) {
    //   return
    // }

    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
      Object.keys(nestedContent).forEach(docTitle => {
        const tagRef = db.collection('tags').doc(encode(key))
        tagRef.set({
          label: key
        })
        tagRef.collection('chats').doc(encode(docTitle)).set(nestedContent[docTitle]).then((res) => {
          console.log("Document successfully written!");
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      });
    }
  });
}

function addFlatten() {
  data.group.forEach((chat, i) => {
    if (i > 2) {
      return
    }
    const ref = db.collection('chats').doc(slug(chat.title))
    ref.set({
      ...chat,
      type: 'group'
    })
  });
}
