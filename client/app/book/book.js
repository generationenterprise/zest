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
    .controller('BookCtrl', function($scope, $state, BookingService, Extra, $modal, Auth, $localStorage, Customer, $q) {

        $scope.submitting = false;
        $scope.loading = true;

        $scope.customer = {
            email: '',
            fullName: '',
            mobilePhone: ''
        };

        var loaders = [];

        $scope.isLoggedIn = Auth.isLoggedIn;

        if (Auth.isLoggedIn()) {
            $scope.customer = Customer.get({
                id: Auth.getCustomerId()
            }, function(customer) {
                $scope.customer.fullName = customer.firstName + ' ' + customer.lastName;
            });
            loaders.push($scope.customer);
        }

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
        var extras = Extra.query(function(extras) {
            $scope.extras = extras;
        });

        loaders.push(extras);

        $q.all(loaders).then(function(resps) {
            $scope.loading = false;
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
            return $scope.customer.fullName && $scope.customer.fullName.split(' ').length >= 2;
        };

        var isValidMobile = function() {
            if (_.isString($scope.customer.mobilePhone)) {
                $scope.customer.mobilePhone = $scope.customer.mobilePhone.replace(/\D/g, '');
            }
            return $scope.customer.mobilePhone && ('' + $scope.customer.mobilePhone).length >= 10;
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
                    msg = 'Enter your first and last name.';
                }
                return msg;
            }
        };

        $scope.continue = function() {
            $scope.submitting = true;
            $scope.cleaning.extras = _.where($scope.extras, {
                selected: true
            });
            if (Auth.isLoggedIn() && Auth.hasBookings() === false) {
                $scope.doBooking();
            } else if (Auth.isLoggedIn() && (Auth.hasBookings() !== false)) {
                $scope.doChoose();
            } else {
                BookingService.contains($scope.customer).then(function(data) {
                    if (!data) {
                        $scope.doRegister();

                    } else {
                        $scope.doLogin();
                    }
                });

            }
        };

        $scope.doBooking = function() {

            var names = $scope.customer.fullName.split(' ');
            $scope.customer.id = Auth.getCustomerId();
            $scope.customer.firstName = names.slice(0, names.length - 1).join(' ');
            $scope.customer.lastName = names[names.length - 1];

            BookingService.register({
                customer: $scope.customer,
                booking: $scope.booking,
                cleaning: $scope.cleaning
            }).then(function(booking) {
                BookingService.setCurrentBookingId(booking.id);
                $state.go('schedule');
            });

        };

        $scope.doChoose = function() {
            var modalInstance = $modal.open({
                templateUrl: 'choose-modal.html',
                controller: 'ModalChooseCtrl',
                backdrop: 'static',
                resolve: {
                    customer: function() {
                        return $scope.customer;
                    }
                }
            });

            modalInstance.result.then(function(data) {
                $scope.doBooking();

            }).finally(function() {
                $scope.submitting = false;
            });

        };

        $scope.doRegister = function() {
            var modalInstance = $modal.open({
                templateUrl: 'register-modal.html',
                controller: 'ModalRegisterCtrl',
                backdrop: 'static',
                resolve: {
                    customer: function() {
                        return $scope.customer;
                    }
                }
            });

            modalInstance.result.then(function(data) {
                $scope.doBooking();

            }).finally(function() {
                $scope.submitting = false;
            });
        };

        $scope.doLogin = function() {
            $localStorage.popupLogin = true;
            var modalInstance = $modal.open({
                templateUrl: 'login-modal.html',
                controller: 'ModalLoginCtrl',
                backdrop: 'static',
                resolve: {
                    customer: function() {
                        return $scope.customer;
                    }
                }
            });

            modalInstance.result.then(function(data) {
                if (Auth.hasBookings()) {
                    $scope.doChoose();
                }
                $localStorage.popupLogin = false;

            }).finally(function() {
                $scope.submitting = false;
                $localStorage.popupLogin = false;
            });
        };

    }).controller('ModalLoginCtrl', function($scope, $modalInstance, customer, Auth) {
        $scope.continue = function() {
            Auth.login({
                    email: customer.email,
                    password: $scope.password
                })
                .then(function(data) {
                    $modalInstance.close(data);
                })
                .catch(function(err) {
                    $scope.error = err.message;
                });
        };

        $scope.reset = function() {
            $scope.error = "";
            Auth.resetPassword(customer.email).then(function(data) {
                $scope.didReset = true;
            });
        };

    }).controller('ModalRegisterCtrl', function($scope, $modalInstance, customer, Auth) {
        $scope.customer = customer;

        $scope.isValid = function() {
            return ($scope.password && $scope.password === $scope.passwordConfirm);
        };

        $scope.continue = function() {
            Auth.createUser({
                    name: customer.fullName,
                    email: customer.email,
                    phone: customer.mobilePhone,
                    password: $scope.password
                })
                .then(function(data) {
                    $modalInstance.close(data);
                })
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }).controller('ModalChooseCtrl', function($scope, $modalInstance, customer, $state) {

        $scope.createNew = function() {
            $modalInstance.close(customer);
        };

        $scope.modifyExisting = function() {
            $state.go('bookings');
            $modalInstance.dismiss('cancel');
        };
    });