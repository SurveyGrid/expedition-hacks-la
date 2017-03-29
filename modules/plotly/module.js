angular.module('sabio.plotly', ['ui.router'])
.config(function($stateProvider) {
    $stateProvider
        .state('app.graph', {
            url: '/',
            views: {
                'content@app': {
                    templateUrl: 'public/modules/plotly/views/plotly.html',
                    controller: 'PlotlyController as PlotlyCtrl'
                }
            }
        })
})

