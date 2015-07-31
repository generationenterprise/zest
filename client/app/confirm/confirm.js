'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('confirm', {
                url: '/confirm',
                templateUrl: 'app/confirm/confirm.html',
                controller: 'ConfirmCtrl'
            });
    })
    .controller('ConfirmCtrl', function($scope, $state, Booking, BookingService) {

        $scope.loading = true;

        $scope.booking = Booking.get({
            id: BookingService.getCurrentBookingId()
        }, function(booking) {
            booking.total = parseFloat(booking.total);
            $scope.booking = booking;
            
            $scope.loading = false;
        });

        $scope._ = _;

        $scope.continue = function() {
            //$state.go('checkout');
        };
    });