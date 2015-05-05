'use strict';

angular.module('zestServicesApp')
    .factory('BookingService', function Auth($location, $rootScope, $http, Customer, Cleaning, $cookieStore, $q, $localStorage) {

        //var bookingTypes = BookingType.query();

        return {
            contains: function(customer) {
                var deferred = $q.defer();

                $http.post('/api/customers/contains', customer).
                success(function(data) {
                    deferred.resolve(data);
                }).
                error(function(err) {
                    deferred.reject(err);
                }.bind(this));

                return deferred.promise;
            },

            register: function(options) {
                var deferred = $q.defer();

                $http.post('/api/bookings/register', options).
                success(function(data) {
                    deferred.resolve(data);
                }).
                error(function(err) {
                    deferred.reject(err);
                }.bind(this));

                return deferred.promise;
            },

            setCurrentBookingId: function(id) {
                $localStorage.currentBookingId = id;
            },

            getCurrentBookingId: function() {
                return $localStorage.currentBookingId;
            }
        };
    })
    .factory('Customer', function($resource) {
        return $resource('/api/customers/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('Cleaning', function($resource) {
        return $resource('/api/cleanings/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('Booking', function($resource) {
        return $resource('/api/bookings/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('Extra', function($resource) {
        return $resource('/api/bookings/extras/:id', {
            id: '@_id'
        });
    })
    .factory('BookingType', function($resource) {
        return $resource('/api/bookings/types/:id', {
            id: '@_id'
        });
    })
    .factory('Frequency', function($resource) {
        return $resource('/api/bookings/frequencies/:id', {
            id: '@_id'
        });
    })
    .factory('Pet', function($resource) {
        return $resource('/api/bookings/pets/:id', {
            id: '@_id'
        });
    });