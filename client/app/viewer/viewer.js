'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('viewer', {
                url: '/viewer/{bookingId}',
                templateUrl: 'app/viewer/viewer.html',
                controller: 'ViewerCtrl'
            });
    })
    .controller('ViewerCtrl', function($scope, Booking, $stateParams) {

        $scope.loading = false;
        $scope.booking = Booking.get({
            id: $stateParams.bookingId
        }, function(booking) {
            $scope.booking = booking;
            $scope.loading = false;
        });

        $scope.data = {
            "name": "Json Explorer",
            "qty": 10,
            "has_data": true,
            "arr": [
                10,
                "str", {
                    "nested": "object"
                }
            ],
            "obj": {
                "hello": "world"
            }
        };
    });