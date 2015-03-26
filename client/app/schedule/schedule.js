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
    $scope.continue = function(){
      $state.go('checkout');
    };
  });
