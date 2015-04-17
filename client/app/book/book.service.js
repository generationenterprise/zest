'use strict';

angular.module('zestServicesApp')
    .factory('Cleanings', function($resource) {
        return $resource('/api/cleanings/:id', {
            id: '@_id'
        });
    })
    .factory('Bookings', function($resource) {
        return $resource('/api/bookings/:id', {
            id: '@_id'
        });
    })
    .factory('Extras', function($resource) {
        return $resource('/api/bookings/extras/:id', {
            id: '@_id'
        });
    })
    .factory('BookingTypes', function($resource) {
        return $resource('/api/bookings/types/:id', {
            id: '@_id'
        });
    })
    .factory('Frequencies', function($resource) {
        return $resource('/api/bookings/frequencies/:id', {
            id: '@_id'
        });
    })
    .factory('Pets', function($resource) {
        return $resource('/api/bookings/pets/:id', {
            id: '@_id'
        });
    });
