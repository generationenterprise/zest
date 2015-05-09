'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('bookings', {
                url: '/bookings',
                templateUrl: 'app/bookings/bookings.html',
                controller: 'BookingsCtrl'
            });
    })
    .controller('BookingsCtrl', function($scope, $state, BookingsService, Extra, $modal) {

        $scope.messages = [{
            face: imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            face: imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            face: imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            face: imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            face: imagePath,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }];

    });