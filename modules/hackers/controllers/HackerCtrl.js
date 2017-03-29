/* global angular */
(function() {
    'use strict'

    angular.module('sabio.hackers')
        .controller('hackerController', HackerController)

    HackerController.$inject = ['hackerService', 'hackers']

    function HackerController(hackerService, hackers) {
        'use strict'
        var vm = this
        vm.tagline = 'Hack The Planet!'
        vm.formData = {}
        vm.hackers = hackers

        vm.insert = () => {
            hackerService.insert(vm.formData)
            .then(onInsertSuccess)
            .catch(onError)
        }
        vm.update = () => {
            hackerService.update(vm.formData)
            .then(onUpdateSuccess)
            .catch(onError)
        }

        vm.remove = (id) => {
            hackerService.remove(id)
            .then(onDeleteSuccess)
            .catch(onError)
        }

        function onInsertSuccess(data) {
            vm.formData = null
            if (data.item) {
                vm.hackers.push(data.item)
            }
        }

        function onUpdateSuccess(data) {
            vm.formData = null
            if (data) {
                vm.hackers.push(data)
            }
        }

        function onDeleteSuccess(data) {
            vm.formData = null
            let removeIndex = vm.hackers.findIndex((element, index, hackers) => {
                return element._id === data._id
            })
            vm.hackers.splice(removeIndex, 1)
        }

        function onError(data) {
            console.log(`Error: ${data.errors}`)
        }
    }
})()
