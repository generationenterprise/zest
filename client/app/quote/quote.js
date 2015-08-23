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
    .config(function($stateProvider) {
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

        $scope.request = function() {
            var quote = new Quote($scope.quote);
            $scope.submitting = true;
            quote.$save(function() {
                $scope.done = true;
            });
        };

        $scope.checkEmail = function() {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (!re.test($scope.quote.email)) {
              $scope.emailError = 'Email is invalid.';
            }else{
              $scope.emailError = '';
            }
        };

        $scope.checkPhone = function() {
            var re = /^[0-9]{6,12}$/;
            if (!re.test($scope.quote.mobilePhone)) {
              $scope.phoneError = 'Phone Number is invalid.';
            }else{
              $scope.phoneError = '';
            }
        };

        $scope.isValid = function() {
            return $scope.quote.fullName && $scope.quote.email && $scope.quote.mobilePhone &&
                $scope.quote.location && $scope.quote.bestTime && $scope.quote.description;
        };
    });