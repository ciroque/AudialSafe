"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.AdvancedSettings = function(eventManager, logger, storage) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.storage = storage;
    this.accordion = $('#advancedSettings');
    return this;
};

com.marchex.audial.AdvancedSettings.prototype.init = function() {
    this.logger.write('AdvancedSettings::init');

    return this;
};
