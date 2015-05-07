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
    .controller('ScheduleCtrl', function($scope, $state, BookingService, SchedulingService, Booking, Frequency, Customer, $q) {

        $scope.loading = true;
        $scope.submitting = false;

        $scope.frequency = 1;

        $scope.setFrequency = function(val) {
            $scope.frequencySelected = _.findWhere($scope.frequencies, {
                name: val
            });
        };
        $scope.setFrequency('once');;

        $scope.booking = Booking.get({
            id: BookingService.getCurrentBookingId()
        }, function(booking) {

            $scope.customer = booking.Customer;

            $scope.booking = booking;


            $scope.booking.total = function() {
                var extras = 0;
                if ($scope.booking.Cleaning.Extras) {
                    extras = _.sum(_.pluck($scope.booking.Cleaning.Extras, 'rate'));
                    _.each($scope.booking.Cleaning.Extras, function(extra) {
                        extra.rate = parseInt(extra.rate);
                    });
                }
                return ($scope.booking.hours * $scope.frequencySelected.rate) + extras;
            };

            $scope.frequencies = Frequency.query(function(frequencies) {
                _.each(frequencies, function(frequency) {
                    frequency.label = frequency.description + ' (₦' + frequency.rate + '/hr)';
                });
                $scope.frequencies = frequencies;
                $scope.frequencySelected = $scope.frequencies[0];
            });

            var reqs = [$scope.frequencies, SchedulingService.fetchOpenings($scope.booking.hours)];

            $q.all(reqs).then(function(resps) {
                $scope.months = parseMonths(resps);
                $scope.loading = false;
            });
        });

        $scope.parseMonths = function(resps){
            console.log('resps=',resps);
        };

        $scope.beforeRender = function($view, $dates, $leftDate, $upDate, $rightDate) {
            var now = moment();
            if ($view === 'month') {
                $leftDate.selectable = false;
                $upDate.selectable = false;
                $rightDate.selectable = false;
                _.each($dates, function(date) {
                    var m = moment(date.utcDateValue).month();
                    date.selectable = (m >= now.month() - 1 && m <= now.month() + 1);
                });
            } else if ($view === 'day') {
                _.each($dates, function(date) {
                    var d = moment(date.utcDateValue);
                    date.selectable = ((d > moment(now).add(2, 'days')) && (d.day() !== 6) && (now.diff(d, 'months') >= -1));
                });
            }else if($view === 'hour'){
                console.log('date=',$dates);
            }
        };

        $scope.onSetTime = function(newDate, oldDate) {
            console.log('onsettime=>',newDate);
            $scope.dateTimePicked = newDate;
        };

        $scope.dateTimeConfig = {
            minView: 'minute',
            minuteStep: 30
        };

        $scope.describeFrequency = function(){
            if(!$scope.dateTimePicked){
                return '...'
            }
            var dtp = moment($scope.dateTimePicked);
            if($scope.frequencySelected.name === 'once'){
                return dtp.format('dddd, MMMM Do YYYY, HH:mm');
            }else if($scope.frequencySelected.name === 'weekly'){
                return dtp.format('dddd')+'s at around '+dtp.format('HH:mm');
            }else if('bi-monthly'){
                return '1st and 3rd '+dtp.format('dddd')+'s at around '+dtp.format('HH:mm');
            }else if('monthly'){
                return '1st '+dtp.format('dddd')+'s at around '+dtp.format('HH:mm');
            }
        }

        var isValidDateTime = function() {
            return $scope.dateTimePicked;
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
                if (!isValidDateTime()) {
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

            var c = Customer.update($scope.customer),
                b = Booking.update($scope.booking);

            $q.all([c, b]).then(function() {
                console.log('all done');
                $scope.submitting = false;
            });

            //$state.go('confirm');
        };
    });