'use strict';

angular.module('zestCleaningApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('schedule', {
        url: '/schedule',
        templateUrl: 'app/schedule/schedule.html',
        controller: 'ScheduleCtrl'
      });
  })
  .controller('ScheduleCtrl', function($scope, $state) {

    $scope.users = [
        { id: 1, name: 'Scooby Doo' },
        { id: 2, name: 'Shaggy Rodgers' },
        { id: 3, name: 'Fred Jones' },
        { id: 4, name: 'Daphne Blake' },
        { id: 5, name: 'Velma Dinkley' },
      ];

    $scope.continue = function(){
      $state.go('checkout');
    };
  });
