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
        
    });