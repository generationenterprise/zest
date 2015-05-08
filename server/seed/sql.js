module.exports = function(db) {
    require('./sql.readonly')(db);
    
    /*setTimeout(function() {
        require('./sql.entities')(db);
    }, 3*1000);

    setTimeout(function() {
        require('./sql.calendar')(db);
    }, 6*1000);*/
};