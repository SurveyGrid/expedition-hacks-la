/* global angular */
(function() {
    'use strict'

    angular.module('sabio.addresses')
        .controller('addressController', AddressController)

    AddressController.$inject = ['addressService', 'addresses']

    function AddressController(addressService, addresses) {
        'use strict'
        var vm = this
        vm.tagline = 'Address The Planet!'
        vm.formData = {}
        vm.addresses = addresses
        vm.initialize = _initialize
        vm.map = null

        // geocoder
        vm.address = {
            // address1: '400 Corporate Pointe Drive',
            // city: 'Culver City',
            // state: 'CA',
            // zip: 90291
            // address1: 'El Jadida',
            // city: 'Centre',
            // country: 'Morocco'

            // Agadir,
            // West coast,
            // Morocco,
            // Morocco
        }
        vm.geocoder = null
        vm.map = null
        vm.addressId = null
        vm.geocodeResponse = null
        vm.submitAddressForm = _submitAddressForm

        vm.initialize()

        function _initialize() {
            vm.geocoder = new google.maps.Geocoder()
            var latlng = new google.maps.LatLng(31.791702, -7.09262)
            var mapOptions = {
                scrollwheel: false,
                zoom: 6,
                center: latlng
            }

            vm.map = new google.maps.Map($('#map-canvas')[0], mapOptions)
        }

        function _submitAddressForm() {
            // var addressString = vm.address.address1 + ' ' + vm.address.city + ' ' + vm.address.state + ' ' + vm.address.zip
            var addressString = vm.address.address1 + ' ' + vm.address.city + ' ' + vm.address.country

            _codeAddress(addressString)
        }

        function _codeAddress(address) {
            console.log('address string -> ', address)

            vm.geocoder.geocode({ 'address': address }, _onCodeAddress)
        }

        function _onCodeAddress(results, status) {
            vm.geocodeResponse = JSON.stringify(results, null, '     ')

            if (status == google.maps.GeocoderStatus.OK) {
                var geometry = results[0].geometry
                var loc = geometry.location

                console.log('got location data from API', loc)

                vm.map.setCenter(loc)

                var marker = new google.maps.Marker({
                    map: vm.map,
                    position: loc
                })

                if (geometry.viewport) { vm.map.fitBounds(geometry.viewport) }

                var lat = loc.lat()
                var lon = loc.lng()

                console.log('found coordinates in reply -> (%s, %s)', lat, lon)

                vm.address.latitude = lat
                vm.address.longitude = lon

                _saveAddress()
            } else {
                alert('Geocode was not successful for the following reason: ' + status)
            }
        }

        function _saveAddress() {
            if (vm.addressId && vm.addressId.length > 0) {
                console.log('UPDATE address data', vm.address)
            } else {
                console.log('CREATE address data', vm.address)
            }
        }
        vm.insert = () => {
            addressService.insert(vm.formData)
                .then(onInsertSuccess)
                .catch(onError)
        }
        vm.update = () => {
            addressService.update(vm.formData)
                .then(onUpdateSuccess)
                .catch(onError)
        }

        vm.remove = (id) => {
            addressService.remove(id)
                .then(onDeleteSuccess)
                .catch(onError)
        }

        function onInsertSuccess(data) {
            vm.formData = null
            if (data.item) {
                vm.addresses.push(data.item)
            }
        }

        function onUpdateSuccess(data) {
            vm.formData = null
            if (data) {
                vm.addresses.push(data)
            }
        }

        function onDeleteSuccess(data) {
            vm.formData = null
            let removeIndex = vm.addresses.findIndex((element, index, addresses) => {
                return element._id === data._id
            })
            vm.addresses.splice(removeIndex, 1)
        }

        function onError(data) {
            console.log(`Error: ${data.errors}`)
        }
        // geo code example
    }
})()
