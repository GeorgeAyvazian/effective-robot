'use strict';

var angularApp = angular.module('angularMain', ['ui.router']);

angularApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/partials/home.html',
            controller: 'DashboardCtrl'
        })
        .state('invoice', {
            url: '/invoice',
            templateUrl: 'views/partials/invoice.html',
            controller: 'InvoiceCtrl'
        });
    $urlRouterProvider.otherwise('home');
});