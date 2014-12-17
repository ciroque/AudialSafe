"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.UiWarningListener = function(eventManager, logger) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.el = $('#warningIndicator');
    return this;
};

com.marchex.audial.UiWarningListener.prototype.init = function() {
    this.logger.write('UiWarningListener::init');

    this.registerHandlers();

    return this;
};

com.marchex.audial.UiWarningListener.prototype.registerHandlers = function() {
    this.logger.write('UiWarningListener::registerHandlers');

    var self = this;

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExceeded, function(args) {
        self.el.text('You Are Being Too Loud.');
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdReset, function(args) {
        self.el.text('');
    });

    return this;
};