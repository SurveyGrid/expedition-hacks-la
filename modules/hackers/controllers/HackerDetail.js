/* global angular */
(function() {
    'use strict'

    angular.module('sabio.hackers')
        .controller('hackerDetailController', HackerDetailController)

    HackerDetailController.$inject = ['hackerService', '$stateParams']

    function HackerDetailController(hackerService, $stateParams) {
        'use strict'
        var vm = this
        vm.tagline = 'Hack The Planet!'

        init()

        function init() {
            if ($stateParams.id) {
                hackerService.getById($stateParams.id)
                    .then(onGetByIdSuccess)
                    .catch(onError)
            }
        }

        function onGetByIdSuccess(data) {
            vm.hacker = data.item
        }

        function onError(data) {
            console.log(`Error: ${data.errors}`)
        }
    }
})()
