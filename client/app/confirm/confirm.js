'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('confirm', {
                url: '/confirm',
                templateUrl: 'app/confirm/confirm.html',
                controller: 'ConfirmCtrl'
            });
    })
    .controller('ConfirmCtrl', function($scope, $state) {

        $scope.booking = {
            hours: 3,
            unit: 'hour',
            currency: 'N',
            rate: 35,
            extras: [{
                name: 'Garden',
                price: 20
            }],
            total: (function(_) {
                return function() {
                    return this.currency + '' + ((this.hours * this.rate) + _.sum(_.pluck(this.extras, 'price')));
                };
            })(_)
        };

        $scope.items = [{name: 'one', age: 30 },{ name: 'two', age: 27 },{ name: 'three', age: 50 }];

        console.log('m=',moment().year());

        $scope.card = {
          number: '',
          month: 1,
          months: (function(_){
            return _.range(1,13);
          })(_),
          year: moment().year(),
          years: (function(_, y){
            return _.range(y, y+10);
          })(_, moment().year())
        };

        $scope.continue = function() {
            $state.go('checkout');
        };
    });