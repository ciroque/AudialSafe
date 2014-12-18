"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.DliPowerSwitchListener = function(eventManager, logger, opts) {
    this.opts = opts || { switchAddress: '192.168.1.1', firstLightOutlet: 1, secondLightOutlet: 2 };
    this.eventManager = eventManager;
    this.logger = logger;
    this.primarySet = false;
    return this;
};

com.marchex.audial.DliPowerSwitchListener.prototype.init = function() {
    this.logger.write('DliPowerSwitchListener::init');

    this.registerHandlers();

    return this;
};

com.marchex.audial.DliPowerSwitchListener.prototype.registerHandlers = function() {
    this.logger.write('DliPowerSwitchListener::registerHandlers');

    var self = this;

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExceeded, function() {
        self.primarySet = true;
        self.sendControlMessageToSwitch(self.opts.firstLightOutlet, true);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdReset, function() {
        self.primarySet = false;
        self.sendControlMessageToSwitch(self.opts.firstLightOutlet, false);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExExceeded, function() {
        self.primarySet = true;
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, true);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExReset, function() {
        self.primarySet = false;
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, true);
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdExceeded, function() {
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, true);
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdReset, function() {
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, false);
    });

    this.eventManager.registerHandler(Strings.Events.StopRecordingButtonClicked, function() {
        self.sendControlMessageToSwitch(self.opts.firstLightOutlet, false);
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, false);
    });

    return this;
};

com.marchex.audial.DliPowerSwitchListener.prototype.sendControlMessageToSwitch = function(outlet, state) {
    this.logger.write('DliPowerSwitchListener::sendControlMessageToSwitch');
    // TODO: Make Ajax call...

    console.log('Yep, I sent the message to the power switch: outlet(' + outlet + '), state(' + state + ')');

    return this;
};