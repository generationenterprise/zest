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
    .controller('ConfirmCtrl', function($scope, $state, Booking, BookingService) {

        $scope.loading = true;

        $scope.booking = Booking.get({
            id: BookingService.getCurrentBookingId()
        }, function(booking) {
            booking.total = parseFloat(booking.total);
            $scope.booking = booking;

            $scope.selectedZone = _.find(zones, function(zone){
                return (zone.neighborhoods.indexOf($scope.booking.Customer.neighborhood) !== -1);
            });
            
            $scope.loading = false;
        });

        $scope._ = _;

        var zones = [{
            name: 'Lagos Island',
            neighborhoods: ['Victoria Island', 'Ikoyi', 'Obalende', 'Marina'],
            rate: 0
        }, {
            name: 'Island 1',
            neighborhoods: ['Lekki', 'Ajah', 'Victoria Garden City'],
            rate: 860
        }, {
            name: 'Mainland 1',
            neighborhoods: ['Yaba', 'Surulere', 'Ebute-metta', 'Somolu', 'Mushin'],
            rate: 0
        }, {
            name: 'Mainland 2',
            neighborhoods: ['Ikeja', 'Maryland', 'Bariga', 'Gbagada', 'Oworonshoki', 'Anthony', 'Ilupeju', 'Ogudu'],
            rate: 0
        }, {
            name: 'Mainland 3',
            neighborhoods: ['Apapa', 'Ajeromi-Ifelodun', 'Ajegunle'],
            rate: 0
        }, {
            name: 'Mainland 4',
            neighborhoods: ['Festac', 'Mile 2', 'Amuwo Odofin'],
            rate: 0
        }];

        $scope.neighborhoods = ['Neighborhood'];
        _.each(zones, function(zone){
            _.each(zone.neighborhoods, function(val){
                $scope.neighborhoods.push(val);
            });
        });
        $scope.neighborhoods = $scope.neighborhoods.sort();

        $scope.continue = function() {
            //$state.go('checkout');
        };
    });