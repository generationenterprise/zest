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
        $scope.setFrequency('once');

        $scope.booking = Booking.get({
            id: BookingService.getCurrentBookingId()
        }, function(booking) {

            $scope.customer = booking.Customer;

            $scope.booking = booking;


            $scope.booking.total = function() {
                var extras = 0, transport = 0, bedrooms = $scope.booking.Cleaning.bedrooms;
                if ($scope.booking.Cleaning.Extras) {
                    _.each($scope.booking.Cleaning.Extras, function(extra){
                        extra.rate = parseInt(extra.rate);
                        if(extra.variable){
                            extras += extra.rate*bedrooms;
                        }else{
                            extras += extra.rate;
                        }
                    });
                }
                if($scope.selectedZone){
                    transport = $scope.selectedZone.rate;
                }
                return ($scope.booking.hours * $scope.frequencySelected.rate) + extras + transport;
            };

            $scope.frequencies = Frequency.query(function(frequencies) {
                _.each(frequencies, function(frequency) {
                    frequency.label = frequency.description + ' (₦' + frequency.rate + '/hr)';
                });
                $scope.frequencies = frequencies;
                $scope.frequencySelected = $scope.frequencies[0];
            });

            $scope.openings = SchedulingService.fetchOpenings($scope.booking.hours).then(function(openings) {
                $scope.openings = openings;
            });

            var reqs = [$scope.frequencies, $scope.openings];

            $q.all(reqs).then(function() {
                $scope.customer.neighborhood = $scope.customer.neighborhood || '';
                $scope.setNeighborhood();
                $scope.loading = false;
            });
        });

        var zones = [{
            name: 'Lagos Island',
            neighborhoods: ['Victoria Island', 'Ikoyi', 'Obalende', 'Marina'],
            rate: 0
        }, {
            name: 'Island 1',
            neighborhoods: ['Lekki', 'Ajah', 'Victoria Garden City'],
            rate: 860
        }, {
            name: 'Mainland 1',
            neighborhoods: ['Yaba', 'Surulere', 'Ebute-metta', 'Somolu', 'Mushin'],
            rate: 0
        }, {
            name: 'Mainland 2',
            neighborhoods: ['Ikeja', 'Maryland', 'Bariga', 'Gbagada', 'Oworonshoki', 'Anthony', 'Ilupeju', 'Ogudu'],
            rate: 0
        }, {
            name: 'Mainland 3',
            neighborhoods: ['Apapa', 'Ajeromi-Ifelodun', 'Ajegunle'],
            rate: 0
        }, {
            name: 'Mainland 4',
            neighborhoods: ['Festac', 'Mile 2', 'Amuwo Odofin'],
            rate: 0
        }];

        $scope.neighborhoods = ['Neighborhood'];
        _.each(zones, function(zone){
            _.each(zone.neighborhoods, function(val){
                $scope.neighborhoods.push(val);
            });
        });
        $scope.neighborhoods = $scope.neighborhoods.sort();

        $scope.setNeighborhood = function(){
            $scope.selectedZone = _.find(zones, function(zone){
                return (zone.neighborhoods.indexOf($scope.customer.neighborhood) !== -1);
            });
        };

        $scope.beforeRender = function($view, $dates, $leftDate, $upDate, $rightDate) {
            var now = moment();
            var DISPLAY_MAP = {
                '7:00 AM': 700,
                '7:30 AM': 750,
                '8:00 AM': 800,
                '8:30 AM': 850,
                '9:00 AM': 900,
                '9:30 AM': 950,
                '10:00 AM': 1000,
                '10:30 AM': 1050,
                '11:00 AM': 1100,
                '11:30 AM': 1150,
                '12:00 PM': 1200,
                '12:30 PM': 1250,
                '1:00 PM': 1300,
                '1:30 PM': 1350,
                '2:00 PM': 1400,
                '2:30 PM': 1450,
                '3:00 PM': 1500,
                '3:30 PM': 1550,
                '4:00 PM': 1600/*,
                '4:30 PM': 1650,
                '5:00 PM': 1700,
                '5:30 PM': 1750,
                '6:00 PM': 1800,
                '6:30 PM': 1850*/
            };

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
                    date.selectable = ((d > moment(now).add(2, 'days')) && (d.day() !== 5) && (now.diff(d, 'months') >= -1));
                });
            } else if ($view === 'hour') {
                _.each($dates, function(date) {
                    var d = new Date();
                    d.setTime(date.utcDateValue);
                    d = moment(d);

                    var dt = d.format('YYYY-MM-DD');
                    var ctime = DISPLAY_MAP[date.display];

                    date.selectable = $scope.openings[dt] && (!_.isEmpty($scope.openings[dt][(ctime - 50)]) || !_.isEmpty($scope.openings[dt][ctime]));

                });
            } else if ($view === 'minute') {
                _.each($dates, function(date) {
                    var d = new Date();
                    d.setTime(date.utcDateValue);
                    d = moment(d);

                    var dt = d.format('YYYY-MM-DD');
                    var ctime = DISPLAY_MAP[date.display];

                    date.selectable = $scope.openings[dt] && !_.isEmpty($scope.openings[dt][(ctime - 50)]);

                });
            }
        };

        $scope.onSetTime = function(newDate) {
            $scope.dateTimePicked = newDate;
        };

        $scope.dateTimeConfig = {
            minView: 'minute',
            minuteStep: 30
        };

        $scope.describeFrequency = function() {
            if (!$scope.dateTimePicked) {
                return 'No Date/Time Selected.';
            }
            var dtp = moment($scope.dateTimePicked);
            if ($scope.frequencySelected.name === 'once') {
                return dtp.format('dddd, MMMM Do YYYY, HH:mm');
            } else if ($scope.frequencySelected.name === 'weekly') {
                return 'Every ' + dtp.format('dddd') + ' at ' + dtp.format('HH:mm');
            } else if ($scope.frequencySelected.name === 'bi-weekly') {
                var som = moment(dtp).date(1);
                var week = 0;
                for (; som.date() <= dtp.date(); som.add(1, 'days')) {
                    if (som.day() === dtp.day()) {
                        week++;
                    }
                }
                if (week === 1 || week === 3) {
                    $scope.week = 1;
                    week = '1st and 3rd ';
                } else {
                    $scope.week = 2;
                    week = '2nd and 4th ';
                }
                return week + dtp.format('dddd') + 's at ' + dtp.format('HH:mm');
            } else if ($scope.frequencySelected.name === 'monthly') {
                var somx = moment(dtp).date(1);
                var weekx = 0;
                for (; somx.date() <= dtp.date(); somx.add(1, 'days')) {
                    if (somx.day() === dtp.day()) {
                        weekx++;
                    }
                }
                $scope.week = weekx;
                if (weekx === 1) {
                    weekx = '1st ';
                } else if (weekx === 2) {
                    weekx = '2nd ';
                } else if (weekx === 3) {
                    weekx = '3rd ';
                } else if (weekx === 4) {
                    weekx = '4th ';
                } else {
                    weekx = 'Last ';
                }
                return weekx + dtp.format('dddd') + 's at ' + dtp.format('HH:mm');
            }
        };

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

        var isValidNeighborhood = function(){
            return $scope.customer.neighborhood;
        };

        $scope.validator = {
            disable: function() {
                return !isValidNeighborhood() /*!isValidCode() || !isValidState()*/ || !isValidCity() || !isValidAddress() || !isValidDateTime();
            },
            message: function() {
                var msg = '';
                if (!isValidNeighborhood()) {
                    msg = 'Select a Neighborhood.';
                }
                /*if (!isValidCode()) {
                    msg = 'Enter a valid Postal Code.';
                }
                if (!isValidState()) {
                    msg = 'Enter a valid State.';
                }*/
                if (!isValidCity()) {
                    msg = 'Enter a valid City.';
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

            var wait = [];

            var C = Customer.get({
                id: $scope.booking.Customer.id
            }, function(customer) {
                C._id = C.id;
                C.address = $scope.customer.address;
                C.city = $scope.customer.city;
                C.neighborhood = $scope.customer.neighborhood;
                wait.push(C.$update());
            });

            var B = Booking.get({
                id: BookingService.getCurrentBookingId()
            }, function(booking) {
                B._id = B.id;
                B.total = $scope.booking.total();
                B.confirmed = true;
                wait.push(B.$update());
            });

            var dtp = moment($scope.dateTimePicked);            
            var chour = parseInt(dtp.format('HH')),
                cmin = parseInt(dtp.format('mm'));
            var etime = ((chour * 100 + ((cmin === 30) ? 50 : 0)) - 50);
            var employeeId = $scope.openings[dtp.format('YYYY-MM-DD')][etime][0];
            var S = SchedulingService.schedule(employeeId, $scope.booking, $scope.frequencySelected, dtp, etime, $scope.week);

            $q.all([C, B, S]).then(function(){
                $q.all(wait).then(function(){
                    $state.go('confirm');
                    $scope.submitting = false;
                })
            });

        };
    });