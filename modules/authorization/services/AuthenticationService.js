/* global angular */

(function() {
    'use strict'

    angular.module('sabio.authentication')
  .factory('authenticationService', AuthenticationServiceFactory)

    AuthenticationServiceFactory.$inject = ['$http', 'baseService']

    function AuthenticationServiceFactory($http, baseService) {
        const authenticationService = Object.create(baseService)

        authenticationService.register = userData => {
            return $http.post('/api/users/register', userData)
            .then(onXhrSuccess)
            .catch(onXhrError)
        }

        authenticationService.signin = userData => {
            return $http.post('/api/users/login', userData)
            .then(onXhrSuccess)
            .catch(onXhrError)
        }

        function onXhrSuccess(response) {
            return response.data
        }

        function onXhrError(error) {
            console.log(error.data)
        }

        return authenticationService
    }
})()
