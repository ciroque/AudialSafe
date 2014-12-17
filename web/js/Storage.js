"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.Storage = function(logger) {
    this.logger = logger;
    return this;
};

com.marchex.audial.Storage.prototype.store = function(key, value) {
    localStorage.setItem(key, value);
    return this;
};

com.marchex.audial.Storage.prototype.retrieve = function(key) {
    return localStorage.getItem(key);
};

