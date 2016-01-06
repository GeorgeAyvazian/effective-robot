'use strict';

var angularApp = angular.module('angularMain', ['ui.router']);

angularApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/partials/home.html',
            controller: 'HomeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/partials/login.html',
            controller: 'LoginCtrl'
        })
        .state('steps', {
            url: '/steps/:deploymentId',
            templateUrl: 'views/partials/steps.html',
            controller: 'StepsCtrl'
        })
        .state('users', {
            url: '/users',
            templateUrl: 'views/partials/users.html',
            controller: 'UsersCtrl'
        })
        .state('logout', {
            controller: 'MenuCtrl'
        })
    $urlRouterProvider.otherwise('login');
});