'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('schedule', {
                url: '/schedule',
                templateUrl: 'app/schedule/schedule.html',
                controller: 'ScheduleCtrl'
            });
    })
    .controller('ScheduleCtrl', function($scope, $state, BookingService, Booking, Frequency, $q) {

        $scope.loading = true;

        $scope.booking = Booking.get({
            id: BookingService.getCurrentBookingId()
        }, function(booking) {
            console.log('found booking=',booking);
            $scope.booking = booking;
            $scope.booking.total = function(){
                var extras = _.sum(_.pluck($scope.booking.Cleaning.Extras, 'rate'));
                return ($scope.booking.hours * $scope.booking.frequency.rate) + extras;
            };

            $scope.frequencies = Frequency.query(function(frequencies) {
                _.each(frequencies, function(frequency) {
                    frequency.label = frequency.description + ' (N' + frequency.rate + '/hr)';
                });
                $scope.booking.frequency = frequencies[1];
                $scope.frequencies = frequencies;
                $scope.loading = false;
            });
        });

        $scope.dates = (function() {
            var m = moment(),
                d = [];
            for (var i = 0; i < 15; i++) {
                d.push(new Date(m.month(m.month() + 1).day(i)));
            }
            return d;
        })();

        $scope.times = (function() {
            var m = moment(),
                t = [];
            for (var i = 0; i < 15; i++) {
                t.push(new Date(m.hour(i)));
            }
            return t;
        })();

        $scope.continue = function() {
            $state.go('confirm');
        };
    });