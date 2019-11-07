import { firebase } from '@firebase/app';
import '@firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAxzAJUIsHegSPu25cwQufm_Y8gbEsnH18',
  authDomain: 'desafio-abstract.firebaseapp.com',
  databaseURL: 'https://desafio-abstract.firebaseio.com',
  projectId: 'desafio-abstract',
  storageBucket: 'desafio-abstract.appspot.com',
  messagingSenderId: '85624715953',
  appId: '1:85624715953:web:84089e0c91a9f4bbd0c090',
});

const db = firebaseApp.firestore();

export { db };
