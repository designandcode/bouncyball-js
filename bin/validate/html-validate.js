const validateHtml = require('html-validator');

let htmlValidate = function (html) {
	
  return new Promise((resolve, reject) => {
		
    let options = {
      format: 'text',
      data: html
    }
		
    validateHtml(options)
      .then( data => {
        resolve({ validateHtml: data });
      })
      .catch( error => {
        reject(error)
      })
  });
}


module.exports = htmlValidate;
