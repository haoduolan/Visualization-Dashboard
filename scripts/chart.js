var app = angular.module('LanApp', ['nvd3'])

.controller('MainCtrl', function($scope) {
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 180,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            duration: 500,    
            yAxis: {
                tickFormat: function(d){
                   return d3.format('.01f')(d);
                }
            }
        }
    };
    
    $scope.data = [{ values: [], key: 'Received time-series data' }];
    // $scope.run = true;
    var x = 0;
    $scope.addData = function(d) {
        $scope.data[0].values.push({x: x, y: d});
        if ($scope.data[0].values.length > 20) $scope.data[0].values.shift();
        x++;
    }
           
});
