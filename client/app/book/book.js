'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('book', {
                url: '/book',
                templateUrl: 'app/book/book.html',
                controller: 'BookCtrl'
            });
    })
    .controller('BookCtrl', function($scope, $state, BookingTypes, Bookings, Frequencies, Extras, Pets) {

        Bookings.query(function(bookings) {
            console.log('bookings=',bookings);
        });

        Extras.query(function(extras) {
            console.log('extras=',extras);
            $scope.extras = extras;
        });

        BookingTypes.query(function(types) {
            console.log('types=',types);
        });

        Frequencies.query(function(freq) {
            console.log('freq=',freq);
        });

        Pets.query(function(pets) {
            console.log('pets=',pets);
        });

        $scope.recommendedHours = 2;
        $scope.recommended = function() {
            return $scope.recommendedHours + ' hour' + (($scope.recommendedHours === 1) ? '' : 's');
        };

        $scope.continue = function() {
            $state.go('schedule');
        };
    });
