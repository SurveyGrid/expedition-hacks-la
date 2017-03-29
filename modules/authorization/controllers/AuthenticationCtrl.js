/* global angular */
(function() {
    'use strict'

    angular.module('sabio.authentication')
  .controller('authenticationController', AuthenticationController)

    AuthenticationController.$inject = ['authenticationService', '$controller']

    function AuthenticationController(authenticationService, $controller) {
        'use strict'

        var vm = this
        $controller('BaseController', { vm: vm })

        vm.user = {}

        vm.register = () => {
            authenticationService.register(vm.user)
            .then(onSuccess)
            .catch(onError)
        }
        vm.signin = () => {
            authenticationService.signin(vm.user)
            .then(onSuccess)
            .catch(onError)
        }

        function onSuccess(data) {
            vm.user = null
            vm.alert = data.alert
        }
        function onError(data) {
            console.log(data)
        }
    }
})()
