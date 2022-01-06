
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCO9tnykUSsfuDsDl2FiElRUs7ik-IeGc8",
  authDomain: "decentralised-shopify.firebaseapp.com",
  projectId: "decentralised-shopify",
  storageBucket: "decentralised-shopify.appspot.com",
  messagingSenderId: "124488386844",
  appId: "1:124488386844:web:61c2ad40353c966ef792d9",
  measurementId: "G-WDFYCV415Q"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();


// const auth = getAuth();

// export const Googleprovider = new firebase.auth.GoogleAuthProvider();  //returns a new instance of AuthCredential that wraps Google Sign-In ID or access tokens. Used when calling FirebaseAuth.signInWithCredential(AuthCredential)
// export const GoogleSignIn = () => auth.signInWithPopup(Googleprovider);

export let FacebookUser;

export const Facebookprovider = new firebase.auth.FacebookAuthProvider() 
Facebookprovider.setCustomParameters({'prompt':'select_account'}); //set functionality to the instance to open aprompt to seleact the account
export const FacebookSignIn = () => auth.signInWithPopup(Facebookprovider)
.then((res)=>{
  console.log(res)
  FacebookUser = res.user
})
.catch(err=>console.log(err))
;

 