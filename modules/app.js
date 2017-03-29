/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure */

(function() {
    'use strict'
    angular.module('sabio', [
        'ui.router',
        'ui.bootstrap',

        'sabio.layout',
        'sabio._common',
        'sabio.hackers',
        'sabio.addresses',
        'sabio.authentication',
        // 'sabio.public',
        'sabio.plotly',
        'sabio.home',
        'sabio.form'
    ])
        .config(RouteConfig)
        .run(function($rootScope) {
            $rootScope.$on('$stateChangeError', console.log.bind(console))
        })

    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/home')
        $locationProvider.html5Mode(true)
    }
})()
