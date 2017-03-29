/* global angular */
(function() {
    'use strict'

    angular.module('sabio.addresses', ['ui.router'])
        .config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('app.addresses', {
                url: '/addresses',
                abstract: true
            })
            .state('app.addresses.list', {
                url: '/list',
                data: {
                    css: '/public/modules/css/address.css'
                },
                views: {
                    'content@app': {
                        templateUrl: 'public/modules/addresses/views/address.html',
                        controller: 'addressController as addressCtrl',
                        resolve: {
                            addresses: getAllAddresses
                        }
                    }
                }

            })
    }

    function getAllAddresses(addressService) {
        return addressService.getAll()
            .then((data) => {
                return data.items
            })
            .catch((error) => {
                console.log(error)
            })
    }
})()
