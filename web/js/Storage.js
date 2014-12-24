"use strict";

var org = org || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.Storage = function(logger) {
    this.logger = logger;
    return this;
};

org.ciroque.audial.Storage.prototype.store = function(key, value) {
    this.logger.write('Storage::store');
    localStorage.setItem(key, value);
    return this;
};

org.ciroque.audial.Storage.prototype.retrieve = function(key) {
    this.logger.write('Storage::retrieve');
    return localStorage.getItem(key);
};

