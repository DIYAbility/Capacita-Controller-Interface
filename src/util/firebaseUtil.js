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

// var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/plus.login');


export function getUserAndLayouts() {
	var user = firebase.auth().currentUser;

	if (user) {
		console.log("user", user);
		return {
		  "name": user.displayName,
		  "image": null,
		  "layouts": {
		    "layout-abc": { "name": "Layout ABC", "device": "xbox", "active": true },
		    "layout-efg": { "name": "Layout EFG", "device": "xbox" },
		    "layout-hij": { "name": "Layout HIJ", "device": "ps4" }
		  }
		}

	} else {
		return null;
	}
}

export function createUserWithEmailAndPassword(name, email, password) {
	return new Promise((resolve, reject) => {
		
		firebase.auth().createUserWithEmailAndPassword(email, password).then(sucess => {
			var user = firebase.auth().currentUser;
			user.updateProfile({
			  displayName: name,
			}).then(function() {
				resolve(firebase.auth().currentUser);
			}, function(error) {
			  console.error('error update user profile', user);
			});
		}).catch(error => {
			console.error('error on create with email/password', error);
			reject(error);
		});	
	})
	
}

export function signInWithEmailAndPassword(email, password) {
	return firebase.auth().signInWithEmailAndPassword(email, password);
}