"use strict";

var com = com || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.AdvancedSettings = function(eventManager, logger, storage) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.storage = storage;
    this.accordion = $('#advancedSettings');
    return this;
};

org.ciroque.audial.AdvancedSettings.prototype.init = function() {
    this.logger.write('AdvancedSettings::init');

    return this;
};
