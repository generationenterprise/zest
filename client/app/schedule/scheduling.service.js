'use strict';

angular.module('zestServicesApp')
    .factory('SchedulingService', function Auth($location, $rootScope, $http, Customer, Cleaning, $cookieStore, $q) {

        //var bookingTypes = BookingType.query();

        return {
            fetchOpenings: function(hours) {
                var deferred = $q.defer();

                $http.get('/api/scheduling/openings/'+hours).then(function(resp){
                	deferred.resolve(resp.data);
                });

                return deferred.promise;
            },

            schedule: function(employeeId, booking, frequency, dtp, etime, week){
                var deferred = $q.defer();

                $http.post('/api/scheduling/complete', {
                    frequencyName: frequency.name,
                    CustomerId: booking.CustomerId,
                    EmployeeId: employeeId,
                    BookingId: booking.id,
                    FrequencyId: frequency.id,
                    CleaningId: booking.Cleaning.id,
                    hours: booking.hours,
                    date: dtp,
                    etime: etime,
                    week: week
                }).
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