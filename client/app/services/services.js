'use strict';

angular.module('zestServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('services', {
        url: '/services',
        templateUrl: 'app/services/services.html',
        controller: 'ServicesCtrl'
      });
  })
  .controller('ServicesCtrl', function() {
  });