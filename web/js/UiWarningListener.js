"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.UiWarningListener = function(eventManager, logger) {
    this.tooLoudText = 'You Are Being Too Loud.';
    this.eventManager = eventManager;
    this.logger = logger;
    this.el = $('#warningIndicator');
    this.primarySet = false;
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
        self.primarySet = true;
        self.el.text(self.tooLoudText);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdReset, function(args) {
        self.primarySet = false;
        self.el.text('');
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdExceeded, function(args) {
        self.el.text('WHOA!!! WAY too loud!!!');
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdReset, function(args) {
        if(self.primarySet) {
            self.el.text(self.tooLoudText);
        } else {
            self.el.text('');
        }
    });

    this.eventManager.registerHandler(Strings.Events.StopRecordingButtonClicked, function(args) {
        self.el.text('');
    });

    return this;
};