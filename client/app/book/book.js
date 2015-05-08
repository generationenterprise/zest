'use strict';

angular.module('zestServicesApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('book', {
                url: '/book',
                templateUrl: 'app/book/book.html',
                controller: 'BookCtrl'
            });
    })
    .controller('BookCtrl', function($scope, $state, BookingService, Extra, $modal) {

        $scope.submitting = false;

        // TODO: Remove all
        $scope.customer = {
            email: 'brices@gmail.com',
            fullName: 'Sam Brice',
            mobilePhone: '2345678900'
        };

        $scope.booking = {
            BookingTypeId: 1,
            hours: 2,
            active: true,
            paid: false
        };

        $scope.cleaning = {
            bedrooms: 1,
            bathrooms: 1
        };

        $scope.extras = {
            loading: true
        };
        Extra.query(function(extras) {
            $scope.extras = extras;
        });

        $scope.recommendedHours = function() {
            var hours = 2;
            hours += ($scope.cleaning.bedrooms - 1) * 0.5;
            hours += ($scope.cleaning.bathrooms - 1) * 0.5;
            if ($scope.booking.manual !== true) {
                $scope.booking.hours = hours;
            }
            return hours;
        };
        $scope.recommendation = function() {
            return $scope.recommendedHours() + ' hour' + (($scope.recommendedHours() === 1) ? '' : 's');
        };

        var isValidEmail = function() {
            var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return regex.test($scope.customer.email);
        };

        var isValidFullName = function() {
            return $scope.customer.fullName.split(' ').length >= 2;
        };

        var isValidMobile = function() {
            return $scope.customer.mobilePhone.replace(/\D/g, '').length >= 10;
        };

        $scope.validator = {
            disable: function() {
                return !isValidEmail() || !isValidFullName() || !isValidMobile();
            },
            message: function() {
                var msg = '';
                if (!isValidMobile()) {
                    msg = 'Enter a valid phone.';
                }
                if (!isValidEmail()) {
                    msg = 'Enter a vali email.';
                }
                if (!isValidFullName()) {
                    msg = 'Enter your full name.';
                }
                return msg;
            }
        };

        $scope.continue = function() {
            $scope.submitting = true;
            $scope.cleaning.extras = _.where($scope.extras, {
                selected: true
            });
            BookingService.contains($scope.customer).then(function(data) {
                if (!data) {
                    console.log('new customer');
                    $scope.doRegister();

                } else {
                    console.log('existing customer');
                    $scope.doLogin();
                }
            });
        };

        $scope.doRegister = function() {
            var modalInstance = $modal.open({
                templateUrl: 'register-modal.html',
                controller: 'ModalRegisterCtrl',
                resolve: {
                    customer: function() {
                        return $scope.customer;
                    }
                }
            });

            modalInstance.result.then(function(data) {

                var names = $scope.customer.fullName.split(' ');
                $scope.customer.lastName = names[names.length - 1];
                $scope.customer.firstName = names.slice(0, names.length - 1).join(' ');

                BookingService.register({
                    customer: $scope.customer,
                    booking: $scope.booking,
                    cleaning: $scope.cleaning
                }).then(function(booking) {
                    BookingService.setCurrentBookingId(booking.id);
                    $state.go('schedule');
                    $scope.submitting = true;
                });

            }).finally(function() {
                $scope.submitting = false;
            });
        };

        $scope.doLogin = function() {
            var modalInstance = $modal.open({
                templateUrl: 'login-modal.html',
                controller: 'ModalLoginCtrl',
                resolve: {
                    customer: function() {
                        return $scope.customer;
                    }
                }
            });

            modalInstance.result.then(function(data) {

            }).finally(function() {
                $scope.submitting = false;
            });
        };

    }).controller('ModalLoginCtrl', function($scope, $modalInstance, customer) {
        $scope.customer = customer;

        $scope.continue = function() {
            $modalInstance.close($scope.customer);
        };

        $scope.reset = function() {
            $modalInstance.dismiss('cancel');
        };

    }).controller('ModalRegisterCtrl', function($scope, $modalInstance, customer) {
        $scope.customer = customer;

        $scope.continue = function() {
            $modalInstance.close($scope.customer);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });