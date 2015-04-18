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
        var Qs = [],
            bookingId = BookingService.getCurrentBookingId();

        $scope.booking = Booking.get({
            id: bookingId
        });
        Qs.push($scope.booking);

        $scope.cleaning = BookingService.findCleaningByBookingId(bookingId);
        Qs.push($scope.cleaning);

        $scope.frequencies = Frequency.query();
        Qs.push($scope.frequencies);

        $q.all(Qs).then(function(qs){
          console.log('all finished');
          console.log($scope.booking);
          console.log($scope.frequencies);
          console.log($scope.cleaning);
          $scope.loading = false;
        });

        $scope.BookingSheet = {
            description: function() {
                return '3 hour cleaning, N35/hour';
            },
            rate: function() {
                var hour = $scope.booking.hours,
                    bRate = $scope.booking.BookingType.baseRate,
                    mRate = $scope.booking.BookingType.marginalRate,
                    beds = ($scope.cleaning.beds-1),
                    baths = ($scope.cleaning.bath-1);
                return (bRate + beds + baths)*hour;
            },
            extras: [],
            total: function() {
                var total = this.rate() + ss.sum(_.pluck(this.extras, 'rate'));
                return 'N' + total;
            }
        };
        $scope.BookingSheet.extras = [{
            name: 'Pets',
            rate: 30
        }, {
            name: 'Laundry Wash & Dry',
            rate: 30
        }];

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
