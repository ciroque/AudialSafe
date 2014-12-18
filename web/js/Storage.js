"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.Storage = function(logger) {
    this.logger = logger;
    return this;
};

com.marchex.audial.Storage.prototype.store = function(key, value) {
    this.logger.write('Storage::store');
    localStorage.setItem(key, value);
    return this;
};

com.marchex.audial.Storage.prototype.retrieve = function(key) {
    this.logger.write('Storage::retrieve');
    return localStorage.getItem(key);
};

