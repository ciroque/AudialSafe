"use strict";

var com = com || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.UiWarningListener = function(eventManager, logger) {
    this.tooLoudText = 'You Are Being Too Loud.';
    this.wayTooLoudText = 'WHOA!!! WAY too loud!!!';
    this.tooLoudTooLongText = 'TOO LOUD FOR TOO LONG!!!';
    this.eventManager = eventManager;
    this.logger = logger;
    this.accordion = $('#warningIndicator');
    this.primarySet = false;
    return this;
};

org.ciroque.audial.UiWarningListener.prototype.init = function() {
    this.logger.write('UiWarningListener::init');

    this.registerHandlers();

    return this;
};

org.ciroque.audial.UiWarningListener.prototype.registerHandlers = function() {
    this.logger.write('UiWarningListener::registerHandlers');

    var self = this;

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExceeded, function() {
        self.primarySet = true;
        self.accordion.text(self.tooLoudText);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdReset, function() {
        self.primarySet = false;
        self.accordion.text('');
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExExceeded, function() {
        self.primarySet = true;
        self.accordion.text(self.tooLoudTooLongText);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExReset, function() {
        self.primarySet = false;
        self.accordion.text('');
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdExceeded, function() {
        self.accordion.text(self.wayTooLoudText);
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdReset, function() {
        if(self.primarySet) {
            self.accordion.text(self.tooLoudText);
        } else {
            self.accordion.text('');
        }
    });

    this.eventManager.registerHandler(Strings.Events.StopRecordingButtonClicked, function() {
        self.accordion.text('');
    });

    return this;
};
