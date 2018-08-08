module.exports = {
  plugins: [
    //require('postcss-import')({ root: loader.resourcePath }),
    require('postcss-cssnext'),
    require('cssnano')
  ]
}

