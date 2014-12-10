/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'angular': 'vendor/angular/angular.min',
        'route': 'vendor/angular-ui-router/release/angular-ui-router.min',
        //'domReady': 'vendor/domReady/domReady',
        'angularuibootstrap': 'vendor/angular-bootstrap/ui-bootstrap-tpls',
        'angularsails': 'vendor/angular-sails/dist/angular-sails',
        'angularsailsbind': 'vendor/angular-sails-bind/dist/angular-sails-bind',
        'socketio': 'vendor/socket.io-client/socket.io',
        'sailsio':  'vendor/sails.io.js/dist/sails.io',
        'lazyload': 'vendor/oclazyload/dist/ocLazyLoad.min'
       // jquery: 'vendor/jquery/dist/jquery.min',
        //"fancybox": "vendor/fancybox",
        //"iCheck": "vendor/iCheck/icheck.min",
       // "jquery.parallax": "vendor/jquery.parallax/jquery.parallax",
       // "jquery.waypoints": "vendor/jquery-waypoints/waypoints.min",
        //"jquery.queryloader2": "vendor/queryloader2/jquery.queryloader2.min",
       // "eventEmitter": "vendor/eventEmitter/EventEmitter"
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    'shim': {

        angularuibootstrap: {
          deps: ['angular'],
          exports: 'angular'
        },
        lazyload: {
          deps: ['angular'],
          exports: 'angular'
        },
      route: {
        deps: ['angular'],
        exports: 'angular'
      },
      angularsails: {
        deps: ['angular'],
        exports: 'angular'
      },

        'sails-io': ['socket-io'],
        'angular-sails': ['sails-io','angular','socket-io','angular-sails-bind'],
        'states' : {'deps':['angular'],'exports':'angular.route'},
        'angular': {
          'exports': 'angular'
        }

    }
});

require(['app'], function (app) {
  app.init();
});

