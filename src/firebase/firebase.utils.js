import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDUNzjJBTb3R1RRXEKdhJORXTA0iQ12mGE",
    authDomain: "crown-db-3face.firebaseapp.com",
    databaseURL: "https://crown-db-3face.firebaseio.com",
    projectId: "crown-db-3face",
    storageBucket: "crown-db-3face.appspot.com",
    messagingSenderId: "414898549228",
    appId: "1:414898549228:web:49e2d9ff619c2a250b50c9",
    measurementId: "G-H2RCNVJ3HF"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
