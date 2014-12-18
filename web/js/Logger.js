"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.Logger = function(opts) {
    this.opts = opts || { enabled: true };
    return this;
};

com.marchex.audial.Logger.prototype.write = function(msg) {
    var message = new Date().toISOString() + '\t' + msg;
    if(this.opts.enabled) {
        console.log(message);
    }
    return this;
};
