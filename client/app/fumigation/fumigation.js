'use strict';

angular.module('zestServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fumigation', {
        url: '/fumigation',
        templateUrl: 'app/fumigation/fumigation.html',
        controller: 'FumigationCtrl'
      });
  })
  .controller('FumigationCtrl', function() {
  });