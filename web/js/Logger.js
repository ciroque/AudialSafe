"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.Logger = function() {
    return this;
};

com.marchex.audial.Logger.prototype.write = function(msg) {
    var message = new Date().toISOString() + '\t' + msg;
    console.log(message);
    return this;
};
