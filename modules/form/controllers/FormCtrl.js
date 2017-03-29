/* global angular */
(function() {
    'use strict'

    angular.module('sabio.form')
        .controller('FormController', FormController)

    FormController.$inject = ['formService', '$window']

    function FormController(formService, $window) {
        'use strict'
        var vm = this
        vm.survey = {}
        vm.submitSurvey = _submitSurvey
        vm.surveyArray = []
        vm.survey.data = []
        vm.acreData = []

        vm.insertGraphTwo = _insertGraphTwo

        getAll()

        function getAll() {
            formService.getAll(onSuccess, onError)
        }

        function onSuccess(data) {
            vm.surveyArray = data.items
            console.log(vm.surveyArray)
        }

        function _insertGraphTwo(acreData) {
            console.log('acredata:', acreData)
            var trace1 = {
                x: ['2017-03-01', '2017-03-02', '2017-03-03', '2017-03-04', '2017-03-05', '2017-03-06', '2017-03-07', '2017-03-08', '2017-03-09', '2017-03-10', '2017-03-11', '2017-03-12', '2017-03-13', '2017-03-14', '2017-03-15', '2017-03-16', '2017-03-17', '2017-03-18', '2017-03-19', '2017-03-20', '2017-03-21', '2017-03-22', '2017-03-23', '2017-03-24', '2017-03-25', '2017-03-26'],
                // x: [acreData],
                // y: [4.3, 8.2, 4.1, 5.6, -3, -0.2, 0.3, 0.4, 4.1, 5, 4.6, -0.2, -8.5, -9.1, -2.7, -2.7, -17, -11.3, -5.5, -6.5, -16.9, -12, -6.1, -6.6, -7.9, -10.8, -14.8, -11, -4.4, -1.3, -1.1],
                y: acreData,
                mode: 'lines',
                type: 'scatter',
                name: 'Wheat'
            }
            var trace2 = {
                x: ['2017-03-01', '2017-03-02', '2017-03-03', '2017-03-04', '2017-03-05', '2017-03-06', '2017-03-07', '2017-03-08', '2017-03-09', '2017-03-10', '2017-03-11', '2017-03-12', '2017-03-13', '2017-03-14', '2017-03-15', '2017-03-16', '2017-03-17', '2017-03-18', '2017-03-19', '2017-03-20', '2017-03-21', '2017-03-22', '2017-03-23', '2017-03-24', '2017-03-25', '2017-03-26'],
                y: ['1', '5', '9', '200', '60', '75', '34', '90', '130', '25', '67', '3', '39', '100', '24', '36', '49', '60', '79', '12', '608', '200', '69', '44', '55', '150' ],
                name: 'Barley'
            }

            var data = [trace1, trace2]

            var layout = {
                xaxis: {
                    type: 'date',
                    title: 'March Dates'
                },
                yaxis: {
                    title: 'Acres Of Land'
                },
                title: 'Agriculture Type and Acres in Morocco'
            }

            Plotly.plot('myDiv', data, layout)
        }

        function _submitSurvey() {
            formService.insert(vm.survey, onSubmitSuccess, onError)
        }

        function onSubmitSuccess(data) {
            vm.acreData = []
            vm.survey = data.items
            vm.surveyArray.push(vm.survey)
            console.log(vm.survey)

            for (var i = 0; i < vm.surveyArray.length; i++) {
                vm.acreData.push(vm.surveyArray[i].acre_irrigation)
            }
            console.log('acredata:', vm.acreData)

            $window.alert('Survey submitted successfully!')
            console.log('surveyarray:', vm.surveyArray)
            _insertGraphTwo(vm.acreData)
        }

        function onError() {
            console.log('Error!')
        }
    }
})()
