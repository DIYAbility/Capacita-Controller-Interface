import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getUserData,
  getLayout,
  firebaseSaveLayout
} from './firebaseUtil';

export function saveLayout(data) {
  return new Promise((resolve, reject) => {
    // data.id = 'abcdefg';
    console.log('saving data in api.js', data.id, data)
    firebaseSaveLayout(data.id, data).then(updates => {
      if (updates) {
        resolve(data);
      }
    }).catch(error => {
      reject(error);
    });
    // console.log('layout data',data)
    // resolve(data);
  });
}

export function fetchLayout(id) {
  return new Promise((resolve, reject) => {
    getLayout(id).then(layoutData => {
      resolve(layoutData);
    }).catch(error => {
      console.log(error)
      reject(error);
    });
    // fetch('tmp/layout.json').then(resp => {
    //   resp.json().then(layout => {
    //     console.log(layout)
    //     resolve(layout)
    //   }).catch(error => {
    //     console.log(error)
    //     reject(error);
    //   });
    // }).catch(error => {
    //   reject(error);
    // });
  });
}
export function getCurrentUser(email, password) {
  return new Promise((resolve, reject) => {
    getUserData().then(function(userData) {
      console.log('get current user', userData)
      resolve(userData)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(error);
      reject(error)
    });
  })
}

export function signup(name, email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(name, email, password)
    .then(getUserData) // get user and layouts
    .then(function(userData) {
      console.log('firebase user / layout data', userData)
      resolve(userData)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  });
}

export function signin(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(email, password)
    .then(getUserData)
    .then(function(userData) {
      console.log('sign in user', userData)
      resolve(userData)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(error);
      reject(error)
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
