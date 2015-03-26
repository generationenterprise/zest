'use strict';

angular.module('zestCleaningApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutCtrl'
      });
  })
  .controller('CheckoutCtrl', function($scope, $state) {
    $scope.continue = function(){
      $state.go('confirm');
    };
  });
