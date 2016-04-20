// Karma configuration
// Generated on Mon Jan 20 2014 16:21:22 GMT+0000 (WET)

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],

    files: [
      'public/csv.js',
      'public/csv_test.js',
      'public/vendor/chai.js',
      'public/vendor/mocha.css',
      'public/vendor/mocha.js',
      'public/vendor/sinon-1.17.3.js',
      'public/vendor/blanket.min.js',
      'public/vendor/mocha-blanket.js',
      'public/vendor/sinon-1.7.1.js'
    ],

    client: {
          mocha: {
            ui: 'bdd'
          }
    },

    exclude: [
      'gulpfile.js'
    ],

    preprocessors: {
      'public/test.html': ['html2js']
    },

    plugins : [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-html2js-preprocessor',
      'karma-phantomjs-launcher',
      'karma-safari-launcher'
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS', 'Chrome_travis_ci', 'Firefox'],      // Firefox fue eliminado por errores de version

    captureTimeout: 60000,

    singleRun: false
  });
};
