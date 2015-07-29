'use strict';

angular.module('zestServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ac', {
        url: '/ac',
        templateUrl: 'app/ac/ac.html',
        controller: 'ACCtrl'
      });
  })
  .controller('ACCtrl', function() {
  });