'use strict';

angular.module('zestServicesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('office', {
        url: '/office',
        templateUrl: 'app/office/office.html',
        controller: 'OfficeCtrl'
      });
  })
  .controller('OfficeCtrl', function() {
  });