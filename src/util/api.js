import {signInWithGoogle} from './firebaseUtil';

export function saveLayout(data) {
  return new Promise((resolve, reject) => {
    data.id = 'abcdefg';
    resolve(data);
  });
}

export function fetchLayout(id) {
  return new Promise((resolve, reject) => {
    fetch('tmp/layout.json').then(resp => {
      resp.json().then(layout => {
        console.log(layout)
        resolve(layout)
      }).catch(error => {
        console.log(error)
        reject(error);
      });
    }).catch(error => {
      reject(error);
    });
  });
}

export function signin(username, password) {
  return new Promise((resolve, reject) => {
    console.log("inside api.js", "signin")
    signInWithGoogle().then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log("google user", user);
      resolve(user);
      // ...
    }).catch(error => {
      console.error('firebase signin error', error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      reject(error);
      // ...
    });


    // fetch('tmp/user.json').then(resp => {
    //   if (resp.ok) {
    //     resp.json().then(json => {
    //       resolve(json);
    //     }).catch(error => {
    //       reject(error)
    //     });
    //   } else {
    //     reject('Sign in failed.');
    //   }
    // }).catch(error => {
    //   reject(error);
    // });
  })


  // App.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     // User is signed in.
  //     var displayName = user.displayName;
  //     var email = user.email;
  //     var emailVerified = user.emailVerified;
  //     var photoURL = user.photoURL;
  //     var isAnonymous = user.isAnonymous;
  //     var uid = user.uid;
  //     var providerData = user.providerData;
  //     console.log('FIREBASE',user);
  //   } else {
  //     // User is signed out.
  //     // ...
  //   }
  // });

}
