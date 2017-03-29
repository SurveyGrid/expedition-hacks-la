/* global $ angular */
'use strict';

$(function () {
    // moment.js default language
    // moment.locale('en')

    angular.bootstrap(document, ['sabio']);
});
'use strict';

/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure */

(function () {
    'use strict';

    angular.module('sabio', ['ui.router', 'ui.bootstrap', 'sabio.layout', 'sabio._common', 'sabio.hackers', 'sabio.addresses', 'sabio.authentication',
    // 'sabio.public',
    'sabio.plotly', 'sabio.home', 'sabio.form']).config(RouteConfig).run(function ($rootScope) {
        $rootScope.$on('$stateChangeError', console.log.bind(console));
    });

    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.addresses', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('app.addresses', {
            url: '/addresses',
            abstract: true
        }).state('app.addresses.list', {
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

        });
    }

    function getAllAddresses(addressService) {
        return addressService.getAll().then(function (data) {
            return data.items;
        }).catch(function (error) {
            console.log(error);
        });
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.authentication', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('app.register', {
            url: '/register',
            views: {
                'content@app': {
                    templateUrl: 'public/modules/authorization/views/register.html',
                    controller: 'authenticationController as login'
                }
            }

        }).state('app.login', {
            url: '/login',
            views: {
                'content@app': {
                    templateUrl: 'public/modules/authorization/views/login.html',
                    controller: 'authenticationController as login'
                }
            }

        });
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.form', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

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

        });
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.hackers', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('app.hackers', {
            url: '/plotly',
            abstract: true
        }).state('app.hackers.list', {
            // url: '/list',
            views: {
                'content@app': {
                    templateUrl: 'public/modules/hackers/views/hackers.html',
                    controller: 'hackerController as hackerCtrl',
                    resolve: {
                        hackers: getAllHackers
                    }
                }
            }

        }).state('app.hackers.detail', {
            url: '/:id',
            views: {
                'content@app': {
                    templateUrl: 'public/modules/hackers/views/hacker_detail.html',
                    controller: 'hackerDetailController as hackerCtrl'
                }
            }

        });
    }

    function getAllHackers(hackerService) {
        return hackerService.getAll().then(function (data) {
            return data.items;
        }).catch(function (error) {
            console.log(error);
        });
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.home', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('app.home', {
            url: '/home',
            views: {
                'content@app': {
                    templateUrl: 'public/modules/home/views/home.html'
                }
            }
        });
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.layout', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                root: {
                    templateUrl: 'public/modules/layout/layout.tpl.html'
                }
            }
        });
    }
})();
'use strict';

angular.module('sabio.plotly', ['ui.router']).config(function ($stateProvider) {
    $stateProvider.state('app.graph', {
        url: '/',
        views: {
            'content@app': {
                templateUrl: 'public/modules/plotly/views/plotly.html',
                controller: 'PlotlyController as PlotlyCtrl'
            }
        }
    });
});
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio._common', []);
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.addresses').controller('addressController', AddressController);

    AddressController.$inject = ['addressService', 'addresses'];

    function AddressController(addressService, addresses) {
        'use strict';

        var vm = this;
        vm.tagline = 'Address The Planet!';
        vm.formData = {};
        vm.addresses = addresses;
        vm.initialize = _initialize;
        vm.map = null;

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
        };
        vm.geocoder = null;
        vm.map = null;
        vm.addressId = null;
        vm.geocodeResponse = null;
        vm.submitAddressForm = _submitAddressForm;

        vm.initialize();

        function _initialize() {
            vm.geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(31.791702, -7.09262);
            var mapOptions = {
                scrollwheel: false,
                zoom: 6,
                center: latlng
            };

            vm.map = new google.maps.Map($('#map-canvas')[0], mapOptions);
        }

        function _submitAddressForm() {
            // var addressString = vm.address.address1 + ' ' + vm.address.city + ' ' + vm.address.state + ' ' + vm.address.zip
            var addressString = vm.address.address1 + ' ' + vm.address.city + ' ' + vm.address.country;

            _codeAddress(addressString);
        }

        function _codeAddress(address) {
            console.log('address string -> ', address);

            vm.geocoder.geocode({ 'address': address }, _onCodeAddress);
        }

        function _onCodeAddress(results, status) {
            vm.geocodeResponse = JSON.stringify(results, null, '     ');

            if (status == google.maps.GeocoderStatus.OK) {
                var geometry = results[0].geometry;
                var loc = geometry.location;

                console.log('got location data from API', loc);

                vm.map.setCenter(loc);

                var marker = new google.maps.Marker({
                    map: vm.map,
                    position: loc
                });

                if (geometry.viewport) {
                    vm.map.fitBounds(geometry.viewport);
                }

                var lat = loc.lat();
                var lon = loc.lng();

                console.log('found coordinates in reply -> (%s, %s)', lat, lon);

                vm.address.latitude = lat;
                vm.address.longitude = lon;

                _saveAddress();
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        }

        function _saveAddress() {
            if (vm.addressId && vm.addressId.length > 0) {
                console.log('UPDATE address data', vm.address);
            } else {
                console.log('CREATE address data', vm.address);
            }
        }
        vm.insert = function () {
            addressService.insert(vm.formData).then(onInsertSuccess).catch(onError);
        };
        vm.update = function () {
            addressService.update(vm.formData).then(onUpdateSuccess).catch(onError);
        };

        vm.remove = function (id) {
            addressService.remove(id).then(onDeleteSuccess).catch(onError);
        };

        function onInsertSuccess(data) {
            vm.formData = null;
            if (data.item) {
                vm.addresses.push(data.item);
            }
        }

        function onUpdateSuccess(data) {
            vm.formData = null;
            if (data) {
                vm.addresses.push(data);
            }
        }

        function onDeleteSuccess(data) {
            vm.formData = null;
            var removeIndex = vm.addresses.findIndex(function (element, index, addresses) {
                return element._id === data._id;
            });
            vm.addresses.splice(removeIndex, 1);
        }

        function onError(data) {
            console.log('Error: ' + data.errors);
        }
        // geo code example
    }
})();
'use strict';

/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict';

    angular.module('sabio.addresses').factory('addressService', AddressServiceFactory);

    AddressServiceFactory.$inject = ['$http'];

    function AddressServiceFactory($http) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove
        };

        function getAll() {
            return $http.get('/api/addresses').then(xhrSuccess).catch(onError);
        }

        function getById(id, onSuccess, onError) {
            return $http.get('/api/addresses/' + id).then(xhrSuccess).catch(onError);
        }

        function insert(addressData, onSuccess, onError) {
            return $http.post('/api/addresses', addressData).then(xhrSuccess).catch(onError);
        }

        function update(addressData, onSuccess, onError) {
            return $http.put('/api/addresses/' + addressData._id, addressData).then(xhrSuccess).catch(onError);
        }

        function remove(id, onSuccess, onError) {
            return $http.delete('/api/addresses/' + id).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            console.log(error.data);
        }
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.authentication').controller('authenticationController', AuthenticationController);

    AuthenticationController.$inject = ['authenticationService', '$controller'];

    function AuthenticationController(authenticationService, $controller) {
        'use strict';

        var vm = this;
        $controller('BaseController', { vm: vm });

        vm.user = {};

        vm.register = function () {
            authenticationService.register(vm.user).then(onSuccess).catch(onError);
        };
        vm.signin = function () {
            authenticationService.signin(vm.user).then(onSuccess).catch(onError);
        };

        function onSuccess(data) {
            vm.user = null;
            vm.alert = data.alert;
        }
        function onError(data) {
            console.log(data);
        }
    }
})();
'use strict';

/* global angular */

(function () {
    'use strict';

    angular.module('sabio.authentication').factory('authenticationService', AuthenticationServiceFactory);

    AuthenticationServiceFactory.$inject = ['$http', 'baseService'];

    function AuthenticationServiceFactory($http, baseService) {
        var authenticationService = Object.create(baseService);

        authenticationService.register = function (userData) {
            return $http.post('/api/users/register', userData).then(onXhrSuccess).catch(onXhrError);
        };

        authenticationService.signin = function (userData) {
            return $http.post('/api/users/login', userData).then(onXhrSuccess).catch(onXhrError);
        };

        function onXhrSuccess(response) {
            return response.data;
        }

        function onXhrError(error) {
            console.log(error.data);
        }

        return authenticationService;
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.form').controller('FormController', FormController);

    FormController.$inject = ['formService', '$window'];

    function FormController(formService, $window) {
        'use strict';

        var vm = this;
        vm.survey = {};
        vm.submitSurvey = _submitSurvey;
        vm.surveyArray = [];
        vm.survey.data = [];
        vm.acreData = [];

        vm.insertGraphTwo = _insertGraphTwo;

        getAll();

        function getAll() {
            formService.getAll(onSuccess, onError);
        }

        function onSuccess(data) {
            vm.surveyArray = data.items;
            console.log(vm.surveyArray);
        }

        function _insertGraphTwo(acreData) {
            console.log('acredata:', acreData);
            var trace1 = {
                x: ['2017-03-01', '2017-03-02', '2017-03-03', '2017-03-04', '2017-03-05', '2017-03-06', '2017-03-07', '2017-03-08', '2017-03-09', '2017-03-10', '2017-03-11', '2017-03-12', '2017-03-13', '2017-03-14', '2017-03-15', '2017-03-16', '2017-03-17', '2017-03-18', '2017-03-19', '2017-03-20', '2017-03-21', '2017-03-22', '2017-03-23', '2017-03-24', '2017-03-25', '2017-03-26'],
                // x: [acreData],
                // y: [4.3, 8.2, 4.1, 5.6, -3, -0.2, 0.3, 0.4, 4.1, 5, 4.6, -0.2, -8.5, -9.1, -2.7, -2.7, -17, -11.3, -5.5, -6.5, -16.9, -12, -6.1, -6.6, -7.9, -10.8, -14.8, -11, -4.4, -1.3, -1.1],
                y: acreData,
                mode: 'lines',
                type: 'scatter',
                name: 'Wheat'
            };
            var trace2 = {
                x: ['2017-03-01', '2017-03-02', '2017-03-03', '2017-03-04', '2017-03-05', '2017-03-06', '2017-03-07', '2017-03-08', '2017-03-09', '2017-03-10', '2017-03-11', '2017-03-12', '2017-03-13', '2017-03-14', '2017-03-15', '2017-03-16', '2017-03-17', '2017-03-18', '2017-03-19', '2017-03-20', '2017-03-21', '2017-03-22', '2017-03-23', '2017-03-24', '2017-03-25', '2017-03-26'],
                y: ['1', '5', '9', '200', '60', '75', '34', '90', '130', '25', '67', '3', '39', '100', '24', '36', '49', '60', '79', '12', '608', '200', '69', '44', '55', '150'],
                name: 'Barley'
            };

            var data = [trace1, trace2];

            var layout = {
                xaxis: {
                    type: 'date',
                    title: 'March Dates'
                },
                yaxis: {
                    title: 'Acres Of Land'
                },
                title: 'Agriculture Type and Acres in Morocco'
            };

            Plotly.plot('myDiv', data, layout);
        }

        function _submitSurvey() {
            formService.insert(vm.survey, onSubmitSuccess, onError);
        }

        function onSubmitSuccess(data) {
            vm.acreData = [];
            vm.survey = data.items;
            vm.surveyArray.push(vm.survey);
            console.log(vm.survey);

            for (var i = 0; i < vm.surveyArray.length; i++) {
                vm.acreData.push(vm.surveyArray[i].acre_irrigation);
            }
            console.log('acredata:', vm.acreData);

            $window.alert('Survey submitted successfully!');
            console.log('surveyarray:', vm.surveyArray);
            _insertGraphTwo(vm.acreData);
        }

        function onError() {
            console.log('Error!');
        }
    }
})();
'use strict';

/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict';

    angular.module('sabio.form').factory('formService', FormServiceFactory);

    FormServiceFactory.$inject = ['$http'];

    function FormServiceFactory($http) {
        return {
            insert: insert,
            getAll: getAll
        };

        function insert(data, onSuccess, onError) {
            // accepting two function as parameters... ,
            return $http.post('/api/form/', data).then(function (response) {
                onSuccess(response.data);
            }).catch(function (response) {
                onError(response.data);
            });
        }

        function getAll(onSuccess, onError) {
            return $http.get('/api/form/').then(function (response) {
                onSuccess(response.data);
            }).catch(function (response) {
                onError(response.data);
            });
        }
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.hackers').controller('hackerController', HackerController);

    HackerController.$inject = ['hackerService', 'hackers'];

    function HackerController(hackerService, hackers) {
        'use strict';

        var vm = this;
        vm.tagline = 'Hack The Planet!';
        vm.formData = {};
        vm.hackers = hackers;

        vm.insert = function () {
            hackerService.insert(vm.formData).then(onInsertSuccess).catch(onError);
        };
        vm.update = function () {
            hackerService.update(vm.formData).then(onUpdateSuccess).catch(onError);
        };

        vm.remove = function (id) {
            hackerService.remove(id).then(onDeleteSuccess).catch(onError);
        };

        function onInsertSuccess(data) {
            vm.formData = null;
            if (data.item) {
                vm.hackers.push(data.item);
            }
        }

        function onUpdateSuccess(data) {
            vm.formData = null;
            if (data) {
                vm.hackers.push(data);
            }
        }

        function onDeleteSuccess(data) {
            vm.formData = null;
            var removeIndex = vm.hackers.findIndex(function (element, index, hackers) {
                return element._id === data._id;
            });
            vm.hackers.splice(removeIndex, 1);
        }

        function onError(data) {
            console.log('Error: ' + data.errors);
        }
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio.hackers').controller('hackerDetailController', HackerDetailController);

    HackerDetailController.$inject = ['hackerService', '$stateParams'];

    function HackerDetailController(hackerService, $stateParams) {
        'use strict';

        var vm = this;
        vm.tagline = 'Hack The Planet!';

        init();

        function init() {
            if ($stateParams.id) {
                hackerService.getById($stateParams.id).then(onGetByIdSuccess).catch(onError);
            }
        }

        function onGetByIdSuccess(data) {
            vm.hacker = data.item;
        }

        function onError(data) {
            console.log('Error: ' + data.errors);
        }
    }
})();
'use strict';

/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict';

    angular.module('sabio.hackers').factory('hackerService', HackerServiceFactory);

    HackerServiceFactory.$inject = ['$http'];

    function HackerServiceFactory($http) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove
        };

        function getAll() {
            return $http.get('/api/hackers').then(xhrSuccess).catch(onError);
        }

        function getById(id, onSuccess, onError) {
            return $http.get('/api/hackers/' + id).then(xhrSuccess).catch(onError);
        }

        function insert(hackerData, onSuccess, onError) {
            return $http.post('/api/hackers', hackerData).then(xhrSuccess).catch(onError);
        }

        function update(hackerData, onSuccess, onError) {
            return $http.put('/api/hackers/' + hackerData._id, hackerData).then(xhrSuccess).catch(onError);
        }

        function remove(id, onSuccess, onError) {
            return $http.delete('/api/hackers/' + id).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            console.log(error.data);
        }
    }
})();
'use strict';

// Description: This will inject an instance of this controller into the scope of the child controller
// Usage: Psuedo inheritance in child controller, $controller('BaseController', { vm: vm });
// Refs: http://jasonwatmore.com/post/2014/03/25/angularjs-a-better-way-to-implement-a-base-controller
/* global angular */
(function () {
    'use strict';

    angular.module('sabio._common').controller('BaseController', BaseController);

    BaseController.$inject = ['$document', '$log', 'vm'];

    function BaseController($document, $log, vm) {
        vm.closeAlert = function () {
            vm.alert = null;
        };

        vm.$document = $document;
        vm.$log = $log;
    }
})();
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('sabio._common').factory('baseService', BaseServiceFactory);

    BaseServiceFactory.$inject = ['$http'];

    function BaseServiceFactory($http) {
        return {
            checkBaseMethod: function checkBaseMethod() {
                console.log('this is from the baseService');
            }
        };
    }
})();