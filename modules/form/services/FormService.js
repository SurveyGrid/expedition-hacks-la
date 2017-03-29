/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function() {
    'use strict'

    angular.module('sabio.form')
        .factory('formService', FormServiceFactory)

    FormServiceFactory.$inject = ['$http']

    function FormServiceFactory($http) {
        return {
            insert,
            getAll
        }

        function insert(data, onSuccess, onError) { // accepting two function as parameters... ,
            return $http.post('/api/form/', data)
                .then((response) => {
                    onSuccess(response.data)
                })
                .catch((response) => {
                    onError(response.data)
                })
        }

        function getAll(onSuccess, onError) {
            return $http.get('/api/form/')
                .then((response) => {
                    onSuccess(response.data)
                })
                .catch((response) => {
                    onError(response.data)
                })
        }
    }
})()
