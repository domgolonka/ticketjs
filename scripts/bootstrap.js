/**
 * bootstraps angular onto the window.document node
 */
define([
  'require',
  'angular',
  'app'
], function (require, ng) {
  'use strict';

  //io.sails.useCORSRouteToGetCookie = false;
  //io.sails.url = 'http://localhost:1337';

  /*ng.element(document).ready(function() {
   ng.bootstrap(document, ['app']);
   });*/
  require(['domReady!'], function (document) {

    ng.bootstrap(document, ['app']);

  });
});
