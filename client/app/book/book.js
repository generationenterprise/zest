'use strict';

angular.module('zestCleaningApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('book', {
                url: '/book',
                templateUrl: 'app/book/book.html',
                controller: 'BookCtrl'
            });
    })
    .controller('BookCtrl', function($scope, $state) {
        $scope.recommendedHours = 2;
        $scope.recommended = function(){
          return $scope.recommendedHours + " hour" + (($scope.recommendedHours === 1) ? "" : "s");
        }

        $scope.extras = [{
          name: "Carpets", 
          icon:"carpets.png"
        }, {
          name: "Closet",
          icon: "closet.png"
        }, {
          name: "Cofee",
          icon: "cofee.png"
        }, {
          name: "Garden",
          icon: "garden.png"
        }, {
          name: "Dishes",
          icon: "dishes.png"
        }];

        $scope.continue = function() {
            console.log('schedule=',$scope.email);
            $state.go('schedule');
        };
    });