'use strict';

angular.module('zestServicesApp')
    .factory('Extras', function($resource) {
        return $resource('/api/bookings/extras', {
            id: '@_id'
        });
    });
