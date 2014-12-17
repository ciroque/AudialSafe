"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.ThresholdListener = function(eventManager, logger) {
    this.eventManager = eventManager;
    this.logger = logger;
    return this;
};

com.marchex.audial.ThresholdListener.prototype.init = function() {
    this.logger.write('ThresholdListener::init');
    this.registerHandlers();
    return this;
};

com.marchex.audial.ThresholdListener.prototype.registerHandlers = function() {
    this.logger.write('ThresholdListener::registerHandlers');



    return this;
};