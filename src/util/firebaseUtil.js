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

// Get a reference to the database service
var database = firebase.database();

function createLayout(layoutData) {
  return new Promise((resolve, reject) => {
    var userId = firebase.auth().currentUser.uid;
    if (userId != null) {

      // Get a key for a new Layout.
      var newLayoutKey = firebase.database().ref('layouts/' + userId).push().key;

      // where do we need to write data? put all paths and data in updates obj
      var updates = {};
      updates['/layouts/' + userId + '/' + newLayoutKey] = layoutData;

      // write to database
      resolve(firebase.database().ref().update(updates));
    } else {
      var err =  new Error('no user logged in');
      reject(err);
    }
  })

}

function getLayouts() {
  return new Promise((resolve, reject) => {
    var userId = firebase.auth().currentUser.uid;
    if (userId != null) {
      firebase.database().ref('/layouts/' + userId).once('value').then(function(layouts) {
        resolve(layouts.val());
      });

    } else {
      var err =  new Error('no user logged in');
      console.error(err);
      reject(err);
    }
  });
}


export function getLayout(layoutId) {
  return new Promise((resolve, reject) => {
    var userId = firebase.auth().currentUser.uid;

    if (userId != null && layoutId != null) {
      firebase.database().ref('/layouts/' + userId + '/' + layoutId).once('value').then(function(layout) {
        resolve(layout.val());
      });

    } else {
      var err =  new Error('no user logged in');
      console.error(err);
      reject(err);
    }
  });
}


export function getUserData() {
  return new Promise((resolve, reject) => {
    var user = firebase.auth().currentUser;
    if (user != null) {
      console.log('trying to get userdata',user);

      getLayouts().then(layouts => {
        var data = {
          'name': user.displayName,
          'email': user.email,
          'image': null,
          'layouts': layouts
        };
        resolve(data);

      }).catch(function(err) {
        console.err("unable to fetch layouts", err)
        reject(err);
      })
    } else {
      var err =  new Error('no user logged in');
      reject(err);
    }
  })

}

export function createUserWithEmailAndPassword(name, email, password) {
	return new Promise((resolve, reject) => {
		console.log('firebaseUtil createUser', name, email, password)
		firebase.auth().createUserWithEmailAndPassword(email, password).then(sucess => {
			var user = firebase.auth().currentUser;
			user.updateProfile({
			  displayName: name,
			})
      .then(function() {
        // create new layout
        var layoutData = { "name": "Layout ABC", "device": "xbox", "active": true };
        createLayout(layoutData);
      })
      .then(function() {
				resolve(firebase.auth().currentUser);
			}, function(error) {
			  console.error('error update user profile', user);
			});
		}).catch(error => {
			console.error('error on create with email/password', error);
			reject(error);
		});
	})

  /*

  */

}

export function signInWithEmailAndPassword(email, password) {
	return firebase.auth().signInWithEmailAndPassword(email, password);
}
