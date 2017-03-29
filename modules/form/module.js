/* global angular */
(function() {
    'use strict'

    angular.module('sabio.form', ['ui.router'])
        .config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            // .state('app.form', {
            //     url: '/form',
            //     abstract: true
            // })
            .state('app.form', {
                url: '/form',
                views: {
                    'content@app': {
                        templateUrl: 'public/modules/form/views/form.html',
                        controller: 'FormController as FormCtrl'
                    },
                    'formcontent@app': {
                        templateUrl: 'public/modules/form/views/plotly.html',
                        controller: 'FormController as FormCtrl'
                    }
                }

            })
    }
})()
