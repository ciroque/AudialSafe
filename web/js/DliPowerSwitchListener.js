"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.DliPowerSwitchListener = function(eventManager, logger, opts) {
    this.opts = opts || { switchAddress: '127.0.0.1:80', firstLightOutlet: 1, secondLightOutlet: 2 };
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

    var self = this;
    var url = this.opts.switchAddress + '/outlet?' + outlet + '=' + (state ? 'ON' : 'OFF');

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'application/json; charset=utf-8',
        username: 'admin',
        password: '1234',
        processData: false,
        contentType: 'application/json',
        success: function() { self.logger.write('Called the DLI Logger successfully! outlet(' + outlet + '), state(' + state + ')'); },
        error: function(xhr, ajaxOptions, error) { self.logger.write('ERROR Calling the DLI Logger! [' + error + '] outlet(' + outlet + '), state(' + state + ')'); }
    });

    this.logger.write('USED URL: ' + url);

    return this;
};