'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/zestcleaning-dev'
  },

  seedDB: true,
  force: true
};
