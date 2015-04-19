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
        var Qs = [];

        $scope.booking = Booking.get({
            id: BookingService.getCurrentBookingId()
        }, function(booking) {
            $scope.booking = booking;
        });
        Qs.push($scope.booking);

        $scope.selected = {
            name: 'aSubItem'
        };
        $scope.values = [{
            id: 1,
            label: 'aLabel',
            subItem: {
                name: 'aSubItem'
            }
        }, {
            id: 2,
            label: 'bLabel',
            subItem: {
                name: 'bSubItem'
            }
        }];


        $scope.frequencies = Frequency.query(function(frequencies) {
            _.each(frequencies, function(frequency) {
                frequency.label = frequency.description + ' (N' + frequency.rate + '/hr)';
            });
            $scope.frequency = frequencies[0];
            $scope.frequencies = frequencies;
            $scope.loading = false;
        });
        Qs.push($scope.frequencies);

        $q.all(Qs).then(function(qs) {
            $scope.loading = false;
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
