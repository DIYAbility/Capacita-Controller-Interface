import * as firebase from 'firebase';
import { changeRoute } from '../actions/actions-app';
import * as type from '../constants/actions-app';
import store from '../store';


var config = {
        apiKey: "AIzaSyCeAmSVsGvFaqA-KBv2z9aEK1WmzhD642c",
        authDomain: "diyability-capacita.firebaseapp.com",
        databaseURL: "https://diyability-capacita.firebaseio.com",
        projectId: "diyability-capacita",
        storageBucket: "diyability-capacita.appspot.com",
        messagingSenderId: "50070163098"
      };
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch({ type: type.SIGN_IN, status: 'start' });

    getUserData().then(userData => {
      store.dispatch({ type: type.SIGN_IN, status: 'complete', data:userData});

      // switch to first layout
      var layoutIds = Object.keys(userData.layouts);
      if (layoutIds.length >= 1) {
        window.location.href="#layout/"+layoutIds[0];
      }

    }).catch(error => {
      console.error('auth state change error', error);
    });

    // User is signed in.
  } else {
    // No user is signed in.
    console.log('firebase auth','user logged out');
  }
});
// Get a reference to the database service
// var database = firebase.database();

export function firebaseSaveLayout(layoutId, layoutData) {
  return new Promise((resolve, reject) => {
    console.log('in firebase save');
    var userId = firebase.auth().currentUser.uid;
    if (userId != null) {

      // Get a key for a new Layout.
      if (layoutId == null) {
        layoutId = firebase.database().ref('layouts/' + userId).push().key;
      }
      // where do we need to write data? put all paths and data in updates obj
      var updates = {};
      updates['/layouts/' + userId + '/' + layoutId] = layoutData;
      console.log('firebase save layout', updates)
      // write to database
      try {
        console.log('firebase updating....')
        resolve(firebase.database().ref().update(updates));
      } catch (e) {
        reject(e);
      }

    } else {
      var err =  new Error('no user logged in');
      console.error('firebase unable to save no user');
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
        console.log('firebase util getLayout', layout)
        var layoutData = layout.val();
        layoutData.id = layoutId;
        resolve(layoutData);
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
        var layoutData = {
          "name": "Layout ABC",
          "device": "xbox",
          "view": "wireframe",
          "mode": "edit",
          "grid": {
            "xbox": {
              "xbox-1": {
                "name": "XboxTriggerLeft",
                "x": 100,
                "y": 100
              },
              "xbox-2": {
                "name": "XboxBumperLeft",
                "x": 100,
                "y": 300
              }
            },
            "ps4": {}
          }
        };

        // var layoutData = { "name": "Layout ABC", "device": "xbox", "active": true };
        firebaseSaveLayout(null, layoutData);
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
