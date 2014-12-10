/**
 * bootstrap.js
 **/

define(['require', 'angular', 'app'], function(require, angular) { //app refers to file

  'use strict';

  return require(['domReady!'], function(document) {
    return angular.bootstrap(document, ['app']); //in html
  });
});
