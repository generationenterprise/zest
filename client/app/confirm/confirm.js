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
            $scope.booking = booking;
            
            $scope.loading = false;
        });

        $scope._ = _;

        $scope.card = {
            number: '',
            month: 1,
            months: (function(_) {
                return _.range(1, 13);
            })(_),
            year: moment().year(),
            years: (function(_, y) {
                return _.range(y, y + 10);
            })(_, moment().year())
        };

        $scope.continue = function() {
            $scope.booking._id = BookingService.getCurrentBookingId();
            $scope.booking.total = $scope.booking.total();
            $scope.booking.$update(function(booking){
                $state.go('checkout');
            });
        };
    });