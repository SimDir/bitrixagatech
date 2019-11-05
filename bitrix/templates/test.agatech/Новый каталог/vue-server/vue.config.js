module.exports = {
  // proxy API requests to Valet during development
  devServer: {
    proxy: 'http://testphp.test'
  },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: '../public',

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: process.env.NODE_ENV === 'production'
    ? 'index.html'
    : 'index.html'
}