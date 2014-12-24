"use strict";

var com = com || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.EventManager = function(logger) {
    this.logger = logger;
    this.handlerMap = [];
    return this;
};

org.ciroque.audial.EventManager.prototype.registerHandler = function (name, handler) {
    this.logger.write('EventManager::registerHandler');
    if (!this.handlerMap[name]) {
        this.handlerMap[name] = [];
    }

    this.handlerMap[name].push(handler);
    return this;
};

org.ciroque.audial.EventManager.prototype.dispatchEvent = function (name, args) {
    this.logger.write('EventManager::dispatchEvent(' + name + ', ' + JSON.stringify(args) + ')');
    var handler = this.handlerMap[name];
    if (handler) {
        for (var index = 0; index < handler.length; index++) {
            handler[index](args);
        }
    }
    return this;
};
