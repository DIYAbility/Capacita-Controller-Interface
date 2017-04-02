
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
    fetch('tmp/user.json').then(resp => {
      if (resp.ok) {
        resp.json().then(json => {
          resolve(json);
        }).catch(error => {
          reject(error)
        });
      } else {
        reject('Sign in failed.');
      }
    }).catch(error => {
      reject(error);
    });
  })
}
