"use strict";

var com = com || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.Logger = function(opts) {
    this.opts = opts || { enabled: true };
    return this;
};

org.ciroque.audial.Logger.prototype.write = function(msg) {
    var message = new Date().toISOString() + '\t' + msg;
    if(this.opts.enabled) {
        console.log(message);
    }
    return this;
};
