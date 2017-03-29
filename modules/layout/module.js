/* global angular */
(function() {
    'use strict'

    angular.module('sabio.layout', ['ui.router'])
        .config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'public/modules/layout/layout.tpl.html'
                    }
                }
            })
    }
})()
