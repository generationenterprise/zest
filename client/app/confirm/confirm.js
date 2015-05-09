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

            $scope.booking.total = function() {
                var extras = 0;
                if ($scope.booking.Cleaning.Extras) {
                    extras = _.sum(_.pluck($scope.booking.Cleaning.Extras, 'rate'));
                    _.each($scope.booking.Cleaning.Extras, function(extra) {
                        extra.rate = parseInt(extra.rate);
                    });
                }
                return ($scope.booking.hours * $scope.booking.Cleaning.Frequency.rate) + extras;
            };
            $scope.loading = false;
        });

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
            $state.go('checkout');
        };
    });