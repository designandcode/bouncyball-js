const pa11y = require('pa11y');

let a11yValidate = function (fileLocation) {

  return new Promise((resolve, reject) => {
		
    let options = {}

    pa11y(fileLocation, options)
      .then( data => {
        resolve({ a11yValidate: `Warning: ${JSON.stringify(data.issues)}` });
      })
      .catch( error => {
        reject(error);
      });
  });
}


module.exports = a11yValidate;
