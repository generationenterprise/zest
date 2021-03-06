'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('schedule', {
                url: '/schedule',
                templateUrl: 'app/schedule/schedule.html',
                controller: 'ScheduleCtrl'
            });
    })
    .controller('ScheduleCtrl', function($scope, $state) {

        $scope.booking = {
          hours: 3,
          unit: 'hour',
          currency: 'N',
          rate: 35,
          extras: [{
            name: 'Garden', 
            price: 20
          }],
          total: (function(_){            
            return function(){
              return this.currency+''+((this.hours*this.rate)+_.sum(_.pluck(this.extras, 'price')));
            };
          })(_)
        };

        $scope.frequency = {
          set: function($event){
            console.log($event);
          },
          selected: 'Frequency',
          options: [{
            id: 1,
            name: 'Once',
            currency: 'N',
            rate: 35,
            unit: 'hr'
          },{
            id: 2,
            name: 'Weekly',
            currency: 'N',
            rate: 30,
            unit: 'hr'
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
            $state.go('confirm');
        };
    });