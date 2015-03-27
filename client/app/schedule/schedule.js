'use strict';

angular.module('zestCleaningApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('schedule', {
                url: '/schedule',
                templateUrl: 'app/schedule/schedule.html',
                controller: 'ScheduleCtrl'
            });
    })
    .controller('ScheduleCtrl', function($scope, $state) {

        $scope.frequency = {
          set: function($event){
            console.log($event);
          },
          selected: "Frequency",
          options: [{
            id: 1,
            name: "Once",
            currency: "N",
            rate: 35,
            unit: "hr"
          },{
            id: 2,
            name: "Weekly",
            currency: "N",
            rate: 30,
            unit: "hr"
          }]
        };

        $scope.dates = (function(){
          var m = moment(), d = [];
          for(var i = 0; i < 15; i++){
            d.push(new Date(m.month(m.month()+1).day(i)));
          }
          return d;
        })();

        $scope.times = (function(){
          var m = moment(), t = [];
          for (var i = 0; i < 15; i++){
            t.push(new Date(m.hour(i)));
          }
          return t;
        })();

        $scope.continue = function() {
            $state.go('checkout');
        };
    });