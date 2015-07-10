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

        console.log('jshin:',$scope,$state, BookingsService, Extra, $modal);

        $scope.messages = [{
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: ' In your neighborhood doing errands'
        }, {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: ' In your neighborhood doing errands'
        }, {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: ' In your neighborhood doing errands'
        }, {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: ' In your neighborhood doing errands'
        }, {
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: ' In your neighborhood doing errands'
        }];

    });