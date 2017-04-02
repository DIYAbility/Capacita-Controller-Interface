
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
