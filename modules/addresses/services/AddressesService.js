/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function() {
    'use strict'

    angular.module('sabio.addresses')
        .factory('addressService', AddressServiceFactory)

    AddressServiceFactory.$inject = ['$http']

    function AddressServiceFactory($http) {
        return {
            getAll,
            getById,
            insert,
            update,
            remove
        }

        function getAll() {
            return $http.get('/api/addresses')
                .then(xhrSuccess)
                .catch(onError)
        }

        function getById(id, onSuccess, onError) {
            return $http.get(`/api/addresses/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function insert(addressData, onSuccess, onError) {
            return $http.post('/api/addresses', addressData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(addressData, onSuccess, onError) {
            return $http.put(`/api/addresses/${addressData._id}`, addressData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function remove(id, onSuccess, onError) {
            return $http.delete(`/api/addresses/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            console.log(error.data)
        }
    }
})()
