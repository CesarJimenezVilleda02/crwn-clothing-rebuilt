//para que los metodos funcionen debe de estar la config, siempre debe de estar
import firebase from 'firebase/app';
//para la base de datos
import 'firebase/firestore';
//para la autenticacion
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyDk-I9JJMVPgU2tKJSz9p2jjuSdbeozgVY',
    authDomain: 'crown-clothing-optimized.firebaseapp.com',
    projectId: 'crown-clothing-optimized',
    storageBucket: 'crown-clothing-optimized.appspot.com',
    messagingSenderId: '314539564846',
    appId: '1:314539564846:web:b7efa52f9a60420a45e4bf',
    measurementId: 'G-T7C61HNW6W',
};

//debe de ser async, le pasamos lo que nos da el auth, additional va a ser cualquier dato adicional que queramos guardar
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    //si existe el user vamos a hacer una query, esto es un ejemplo de una referencia como respuesta
    // console.log(firestore.doc('users/7edhakjdbkadb')); //como se puede ver regresa un objeto con informacion
    //del estado actual
    // console.log(userAuth);

    const userRef = firestore.doc(`users/${userAuth.uid}`); //referencia del luar en la base
    const snapShot = await userRef.get(); //si ya existen datos vamos a saber si alguien ya se registró aqui
    console.log(snapShot); //j
    //como hasta ahorta no existe regresa con la propiedad exists con un valor de false

    //si no existen datos en ese lugar se crea uno nuevo en ese lugar
    //aunque recarguemos el código esto no cambia porque nuestro código checa si ya existe
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error);
        }
    }

    return userRef;
};

//para que inicie el firebase en el proyecto y se conecte al nuestro
// firebase.initializeApp(config);
if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}

//para usar el auth en todos lados
export const auth = firebase.auth();
//para usar el firestore
export const firestore = firebase.firestore();

//se crea un nuevo objeto
const provider = new firebase.auth.GoogleAuthProvider();
//estos parametros definen lo que pasa, queremos que siempre aga la popup cuando usemos el googleauth
provider.setCustomParameters({ prompt: 'select_account' });

//toma al objeto provider y llama al popup que nos da el auth de google, solo queda configuar el auth
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
};
