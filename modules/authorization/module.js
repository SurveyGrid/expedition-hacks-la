/* global angular */
(function() {
    'use strict'

    angular.module('sabio.authentication', ['ui.router'])
        .config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app.register', {
                url: '/register',
                views: {
                    'content@app': {
                        templateUrl: 'public/modules/authorization/views/register.html',
                        controller: 'authenticationController as login'
                    }
                }

            })
            .state('app.login', {
                url: '/login',
                views: {
                    'content@app': {
                        templateUrl: 'public/modules/authorization/views/login.html',
                        controller: 'authenticationController as login'
                    }
                }

            })
    }
})()
