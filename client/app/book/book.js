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
    .controller('BookCtrl', function($scope, $state, Extras) {
        Extras.query(function(extras) {
            $scope.extras = extras;
        });

        $scope.recommendedHours = 2;
        $scope.recommended = function() {
            return $scope.recommendedHours + ' hour' + (($scope.recommendedHours === 1) ? '' : 's');
        };

        $scope.continue = function() {
            $state.go('schedule');
        };
    });
