'use strict';

angular.module('zestServicesApp')
    .factory('SchedulingService', function Auth($location, $rootScope, $http, Customer, Cleaning, $cookieStore, $q, $localStorage) {

        //var bookingTypes = BookingType.query();

        return {
            fetchOpenings: function(hours) {
                var deferred = $q.defer();

                $http.get('/api/scheduling/openings/'+hours).then(function(resp){
                	deferred.resolve(resp.data);
                })

                return deferred.promise;
            }
        };
    });