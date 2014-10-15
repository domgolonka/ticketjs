define([
    'angular',
    'angular.route',
    'angular-sails',
    './controllers/index',
    /*'./services/index',*/
    /*'./directives/index',*/
    /*'./filters/index'*/
], function (ng) {
    'use strict';

    return ng.module('app', [
        'ngSails',
        'ngRoute',
        'app.controllers',
        // call your 'app.services',
        // call your 'app.directives',
        // call your 'app.filters',
    ]);
});