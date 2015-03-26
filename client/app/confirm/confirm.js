'use strict';

angular.module('zestCleaningApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('confirm', {
        url: '/confirm',
        templateUrl: 'app/confirm/confirm.html',
        controller: 'ConfirmCtrl'
      });
  })
  .controller('ConfirmCtrl', function($scope, $state) {
    $scope.continue = function(){
      $state.go('schedule');
    };
  });
