"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.UiWarningListener = function(eventManager, logger) {
    this.tooLoudText = 'You Are Being Too Loud.';
    this.wayTooLoudText = 'WHOA!!! WAY too loud!!!';
    this.tooLoudTooLongText = 'TOO LOUD FOR TOO LONG!!!';
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

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExceeded, function() {
        self.primarySet = true;
        self.el.text(self.tooLoudText);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdReset, function() {
        self.primarySet = false;
        self.el.text('');
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExExceeded, function() {
        self.primarySet = true;
        self.el.text(self.tooLoudTooLongText);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExReset, function() {
        self.primarySet = false;
        self.el.text('');
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdExceeded, function() {
        self.el.text(self.wayTooLoudText);
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdReset, function() {
        if(self.primarySet) {
            self.el.text(self.tooLoudText);
        } else {
            self.el.text('');
        }
    });

    this.eventManager.registerHandler(Strings.Events.StopRecordingButtonClicked, function() {
        self.el.text('');
    });

    return this;
};
