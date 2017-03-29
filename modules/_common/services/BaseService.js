/* global angular */
(function() {
    'use strict'

    angular.module('sabio._common')
        .factory('baseService', BaseServiceFactory)

    BaseServiceFactory.$inject = ['$http']

    function BaseServiceFactory($http) {
        return {
            checkBaseMethod: () => {
                console.log('this is from the baseService')
            }
        }
    }
})()
