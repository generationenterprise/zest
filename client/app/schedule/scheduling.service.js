'use strict';

angular.module('zestServicesApp')
    .factory('SchedulingService', function Auth($location, $rootScope, $http, Customer, Cleaning, $cookieStore, $q, $localStorage) {

        //var bookingTypes = BookingType.query();

        return {
            fetchOpenings: function(hours) {
                var deferred = $q.defer(),
                	reqs = [],
                	now = moment();

                reqs.push($http.get('/api/scheduling/'+now.year()+'/'+(now.month()+1)+'/'+hours));
                reqs.push($http.get('/api/scheduling/'+now.year()+'/'+(now.month()+2)+'/'+hours));

                $q.all(reqs).then(function(resps){
                	deferred.resolve(_.pluck(resps,'data'));
                })

                return deferred.promise;
            }
        };
    });