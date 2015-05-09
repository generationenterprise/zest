'use strict';

angular.module('zestServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('packages', {
        url: '/packages',
        templateUrl: 'app/packages/packages.html',
        controller: 'PackagesCtrl'
      });
  })
  .controller('PackagesCtrl', function() {
  });