var _ = require('lodash');
var Clog = require('./clog.model');

exports.index = function(req, res) {
    Clog.find(function(err, clogs) {
        if (err) {
            return res.json(500, err);
        }
        return res.json(200, clogs);
    });
};

exports.create = function(req, res){
  // https://github.com/drudge/mongoose-findorcreate
  return res.json(200, {nothing:true});
};
