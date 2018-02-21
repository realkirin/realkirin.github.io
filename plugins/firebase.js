import * as firebase from 'firebase'
import store from '~/store'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyC61qoH8POsOd51vjB5LyFL6tiefOnRcGY',
    authDomain: 'react-firebase-starter-c28c7.firebaseapp.com',
    databaseURL: 'https://react-firebase-starter-c28c7.firebaseio.com',
    projectId: 'react-firebase-starter-c28c7',
    storageBucket: 'react-firebase-starter-c28c7.appspot.com',
    messagingSenderId: '271307299986'
    }
  )
}

export default (context) => {
  const {store} = context

  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      store.commit('setUser', user)
      resolve()
    })
  })
}