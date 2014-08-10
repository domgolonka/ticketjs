/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'angular': 'vendor/angular/angular.min',
        'angular.route': 'vendor/angular-route/angular-route.min',
        'angular.resource': 'vendor/angular-resource/angular-resource.min',
        jquery: 'vendor/jquery/dist/jquery.min',
        "fancybox": "vendor/fancybox",
        "iCheck": "vendor/iCheck/icheck.min",
        "jquery.parallax": "vendor/jquery.parallax/jquery.parallax",
        "jquery.waypoints": "vendor/jquery-waypoints/waypoints.min",
        "jquery.queryloader2": "vendor/queryloader2/jquery.queryloader2.min",
        "eventEmitter": "vendor/eventEmitter/EventEmitter"
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    'shim': {
        "jquery": {
            exports: "jQuery"
        },
        'angular': {
            'deps': ['jquery'],
            'exports': 'angular'
        },
        //'socket.io': {
        //    'exports': 'io'
        //},
        'sails.io': {
            //'deps': ['socket.io'],
            'exports': 'io'
        }

    }
});

require([
    'angular',
    'app',
], function (angular, app) {

    angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        angular.resumeBootstrap([app.name]);
    });

});