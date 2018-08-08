#!/usr/bin/env node

/**
 *	Run all the validators back to back and
 *  stop the currently running operation if
 *  an error is found.
 */

const fs = require('fs')
const { resolve } = require('path');
const fileLocation = './dist/index.html';
const htmlValidate = require(resolve(__dirname, 'html-validate.js'));
const a11yValidate = require(resolve(__dirname, 'a11y-validate.js'));

fs.readFile( fileLocation, 'utf8', (err, html) => {
  if (err) {
    throw err;
  }

  Promise.all([ 
    htmlValidate(html), 
    a11yValidate(fileLocation)
  ])
    .then( values => { console.log(values) })
    .catch( error => { /* exit the process */ })
});

