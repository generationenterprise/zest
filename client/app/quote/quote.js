'use strict';

angular.module('zestServicesApp')
    .factory('Quote', function($resource) {
        return $resource('/api/quotes/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    })
  .config(function ($stateProvider) {
    $stateProvider
      .state('quote', {
        url: '/quote/{service}',
        templateUrl: 'app/quote/quote.html',
        controller: 'QuoteCtrl'
      });
  })
  .controller('QuoteCtrl', function($scope, $stateParams, Quote) {

    $scope.done = false;

    $scope.quote = {
      type: $stateParams.service
    };

    $scope.request = function(){
      var quote = new Quote($scope.quote);
      $scope.submitting = true;
      quote.$save(function(quote){
        $scope.done = true;
      })
    };

    $scope.isValid = function(){
      return $scope.quote.fullName && $scope.quote.email && $scope.quote.mobilePhone && 
             $scope.quote.location && $scope.quote.bestTime && $scope.quote.description;
    };
  });