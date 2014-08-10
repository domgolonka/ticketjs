define([
    'angular',
    'sails.io'
], function (angular, io) {

    var socket = io.connect(), app;

    socket.on('connect', function socketConnected() {
        console.log('Socket is now connected');
    });

    app = angular.module('ngApp', []);

    return app;

});