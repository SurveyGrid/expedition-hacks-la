/* global angular */
(function() {
    'use strict'

    angular.module('sabio.hackers', ['ui.router'])
        .config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app.hackers', {
                url: '/plotly',
                abstract: true
            })
            .state('app.hackers.list', {
                // url: '/list',
                views: {
                    'content@app': {
                        templateUrl: 'public/modules/hackers/views/hackers.html',
                        controller: 'hackerController as hackerCtrl',
                        resolve: {
                            hackers: getAllHackers
                        }
                    }
                }

            })
            .state('app.hackers.detail', {
                url: '/:id',
                views: {
                    'content@app': {
                        templateUrl: 'public/modules/hackers/views/hacker_detail.html',
                        controller: 'hackerDetailController as hackerCtrl'
                    }
                }

            })
    }

    function getAllHackers(hackerService) {
        return hackerService.getAll()
            .then((data) => {
                return data.items
            })
            .catch((error) => {
                console.log(error)
            })
    }
})()
