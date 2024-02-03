import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const clientCredentials = {
  apiKey: "AIzaSyCXjJu9Ic4dQNVbbzT6ce3LKxXgQQ9rtVU",
  authDomain: "shippinglable-6a9db.firebaseapp.com",
  projectId: "shippinglable-6a9db",
  storageBucket: "shippinglable-6a9db.appspot.com",
  messagingSenderId: "932998488387",
  appId: "1:932998488387:web:1e75748c05ff9221968ff6",
};

if (typeof window != undefined && !firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;