import * as firebase from 'firebase';
var config = {
        apiKey: "AIzaSyCeAmSVsGvFaqA-KBv2z9aEK1WmzhD642c",
        authDomain: "diyability-capacita.firebaseapp.com",
        databaseURL: "https://diyability-capacita.firebaseio.com",
        projectId: "diyability-capacita",
        storageBucket: "diyability-capacita.appspot.com",
        messagingSenderId: "50070163098"
      };
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');

export function signInWithGoogle() {
	console.log("trying to sign in with google")
	return firebase.auth().signInWithPopup(provider)
}