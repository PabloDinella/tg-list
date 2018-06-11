import googleFirebase from 'firebase'

require('firebase/firestore') // Required for side-effects

const config = {
  apiKey: 'AIzaSyAi1KlX6q2P3Be3M1gvwt-fLlwg0G7e53A',
  authDomain: 'tg-list.firebaseapp.com',
  databaseURL: 'https://tg-list.firebaseio.com',
  projectId: 'tg-list',
  storageBucket: 'tg-list.appspot.com',
  messagingSenderId: '983638119768',
}

const firebase = googleFirebase.initializeApp(config)


export const firestore = firebase.firestore()

const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);

export default firebase
