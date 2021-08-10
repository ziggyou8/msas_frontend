import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import swal from 'sweetalert';


//crédentials pour la base de donnéss 
/* config1 */
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
/* config1 */

  //Configuration pour ajout et deconnexion des users
  /* config2 */
  const config2 = {
    apiKey: "AIzaSyARjyCtwcR-MjjRxjX2nwEWaE77WNsenxQ",
    authDomain: "msas-10889.firebaseapp.com",
    projectId: "msas-10889",
    storageBucket: "msas-10889.appspot.com",
    messagingSenderId: "844396009761",
    appId: "1:844396009761:web:344e7877d9488bebd80660"
  };

  export const secondaryApp = firebase.initializeApp(config2, "Secondary");
/* End config2 */


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

/* export const getData = async(table)=>{
  const snapshot = await firebase.firestore().collection(table).get();
  
  const data = [];
  snapshot.docs.map(doc => data.push(doc.data()));
   return data;
} */

export const getData = async(table)=>{
  const data = [];
  await firebase.firestore().collection(table).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
    })
  
return data;
}

export const removeItem = async(id)=>{
  const itemRef = await firebase.firestore().collection('structures');
  itemRef.where('id', '==', id).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      firebase.firestore().collection('structures').doc(doc.id).delete()/* .then(console.log('✅✅✅')) */;
    });
  })
  .catch(err => {
    swal("Error!", "...Erreur lor de la supression");
  });
}

export const getItem = async(table, param1, param2)=> {
  const structures = [];
  await firebase.firestore().collection(table)
     .where(param1, '==', param2)
     .get().then(querySnapshot => {
       querySnapshot.forEach(doc => {
        structures.push(doc.data());
     })
   })
   return  {...structures[0]};
  }

//exposer ces variable  ailleur
  export const  auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);


  export default firebase;