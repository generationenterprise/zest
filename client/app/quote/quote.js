'use strict';

angular.module('zestServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('quote', {
        url: '/quote/{service}',
        templateUrl: 'app/quote/quote.html',
        controller: 'QuoteCtrl'
      });
  })
  .controller('QuoteCtrl', function() {
  });