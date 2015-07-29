/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/clogs', require('./api/clog'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/bookings', require('./api/booking'));
  app.use('/api/cleanings', require('./api/cleaning'));
  app.use('/api/scheduling', require('./api/scheduling'));
  app.use('/api/quotes', require('./api/quote'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
