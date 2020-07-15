import firebase from 'firebase/app';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDDHJeANsblNrwPdyr5n7Nl3kfkCrLn4oM',
  authDomain: 'crud-svelte-228b3.firebaseapp.com',
  databaseURL: 'https://crud-svelte-228b3.firebaseio.com',
  projectId: 'crud-svelte-228b3',
  storageBucket: 'crud-svelte-228b3.appspot.com',
  messagingSenderId: '381469998991',
  appId: '1:381469998991:web:d328e55bf31dbe80da55fa',
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
