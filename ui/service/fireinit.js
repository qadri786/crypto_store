import * as firebase from 'firebase/app'
import 'firebase/auth'

var config = {
  apiKey: process.env.FIREBASE.apiKey,
  authDomain: process.env.FIREBASE.authDomain,
  databaseURL: process.env.FIREBASE.databaseURL,
  projectId: process.env.FIREBASE.projectId,
  storageBucket: process.env.FIREBASE.storageBucket,
  messagingSenderId: process.env.FIREBASE.messagingSenderId
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const FacebookProvider = new firebase.auth.FacebookAuthProvider()
export const auth = firebase.auth()
export default firebase