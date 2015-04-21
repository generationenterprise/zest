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
    .controller('ScheduleCtrl', function($scope, $state, BookingService, Booking, Frequency, Customer, $q) {

        $scope.loading = true;

        $scope.booking = Booking.get({
            id: BookingService.getCurrentBookingId()
        }, function(booking) {

            $scope.customer = booking.Customer;
            
            $scope.booking = booking;
            $scope.booking.date = 'Date';
            $scope.booking.time = 'Time';
            $scope.booking.total = function(){
                var extras = 0;
                if($scope.booking.Cleaning.Extras){
                    extras = _.sum(_.pluck($scope.booking.Cleaning.Extras, 'rate'));
                }
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

        var isValidDateTime = function(){
            return $scope.booking.date !== 'Date' && $scope.booking.time !== 'Time';
        };

        var isValidAddress = function() {
            return $scope.customer.address && $scope.customer.address.length >= 2;
        };

        var isValidCity = function() {
            return $scope.customer.city && $scope.customer.city.length >= 2;
        };

        var isValidState = function() {
            return $scope.customer.state && $scope.customer.state.length >= 2;
        };

        var isValidCode = function() {
            return $scope.customer.postcode && $scope.customer.postcode.length >= 2;
        };

        $scope.validator = {
            disable: function() {
                return !isValidCode() || !isValidState() || !isValidCity() || !isValidAddress() || !isValidDateTime();
            },
            message: function() {
                var msg = '';
                if (!isValidCode()) {
                    msg = 'Enter a valid Postal Code.';
                }
                if (!isValidState()) {
                    msg = 'Enter a valid State.';
                }
                if (!isValidCity()) {
                    msg = 'Enter a vali City.';
                }
                if (!isValidAddress()) {
                    msg = 'Enter your street address.';
                }
                if(!isValidDateTime()){
                    msg = 'Select a Date and Time.';
                }
                return msg;
            }
        };

        $scope.continue = function() {
            $scope.submitting = true;
            $scope.customer._id = $scope.customer.id;
            $scope.booking._id = $scope.booking.id;
            $scope.booking.time = 900;
            $scope.booking.day = 'Monday';
            debugger;
            var c = Customer.update($scope.customer),
                b = Booking.update($scope.booking);
                $q.all([c,b]).then(function(){
                    console.log('all done');
                });
            
            //$state.go('confirm');
        };
    });