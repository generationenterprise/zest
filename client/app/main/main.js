'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function($scope) {
        $scope.choosing = false;
        $scope.book = function() {
            $scope.choosing = true;
        }
    });