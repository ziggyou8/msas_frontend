import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


//crédentials pour la base de donnéss 
const config = {
    apiKey: "AIzaSyARjyCtwcR-MjjRxjX2nwEWaE77WNsenxQ",
    authDomain: "msas-10889.firebaseapp.com",
    projectId: "msas-10889",
    storageBucket: "msas-10889.appspot.com",
    messagingSenderId: "844396009761",
    appId: "1:844396009761:web:344e7877d9488bebd80660"
  };
//initialisation de la base de données
  firebase.initializeApp(config);


  export const createUserProfileDocument = async (authUser, additionalData)=>{
    if(!authUser) return;
    
    const userRef =  firestore.doc(`users/${authUser.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = authUser;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return userRef;
}

export const getData = async(table)=>{
  const snapshot = await firebase.firestore().collection(table).get();
  const data = [];
  snapshot.docs.map(doc => data.push(doc.data()));
   return data;
}

//exposer ces variable  ailleur
  export const  auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);


  export default firebase;