'use strict';

angular.module('zestServicesApp')
    .factory('BookingsService', function Auth($location, $rootScope, $http, Customer, Cleaning, $cookieStore, $q) {

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

            all: function(customer){
                var deferred = $q.defer();

                $http.get('/api/customers/contains', customer).
                success(function(data) {
                    deferred.resolve(data);
                }).
                error(function(err) {
                    deferred.reject(err);
                }.bind(this));

                return deferred.promise;
            }
        };
    });