/* global angular */
(function() {
    'use strict'

    angular.module('sabio.home', ['ui.router'])
        .config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: '/home',
                views: {
                    'content@app': {
                        templateUrl: 'public/modules/home/views/home.html'
                    }
                }
            })
    }
})()
