'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    findOrCreate = require('mongoose-findorcreate');
    
var ClogSchema = new Schema({
    moment: String,
    customer_id: Number,
    ip: String,
    user_agent: Boolean
});

ClogSchema.plugin(findOrCreate);

module.exports = mongoose.model('Clog', ClogSchema);
