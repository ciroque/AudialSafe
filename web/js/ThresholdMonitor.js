"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.ThresholdMonitor = function(eventManager, logger) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.settings = null;
    this.primaryThresholdHistory = { timestamp: 0, first: { count: 0, isset: false }, second: { count: 0, isset: false } };
    this.secondaryThresholdHistory = { timestamp: 0, isset: false };
    this.secondaryThresholdTimeoutSeconds = 5;
    return this;
};

com.marchex.audial.ThresholdMonitor.prototype.init = function() {
    this.logger.write('ThresholdMonitor::init');
    this.registerHandlers();

    this.eventManager.dispatchEvent(Strings.Events.SettingsRequest, {});

    return this;
};

com.marchex.audial.ThresholdMonitor.prototype.registerHandlers = function() {
    this.logger.write('ThresholdMonitor::registerHandlers');

    var self = this;

    this.eventManager.registerHandler(Strings.Events.SettingsDump, function(args) {
        self.logger.write('SETTINGS>>> ' + JSON.stringify(args));
        self.handleSettingsDump(args);
    });

    this.eventManager.registerHandler(Strings.Events.VolumeSample, function(args) {
        self.handleVolumeSample(args);
    });

    this.eventManager.registerHandler(Strings.Events.SettingChanged, function(args) {
        self.updateSettings(args);
    });

    this.eventManager.registerHandler(Strings.Events.AppReset, function() {
        self.primaryThresholdHistory = { timestamp: 0, first: { count: 0, isset: false }, second: { count: 0, isset: false } };
        self.secondaryThresholdHistory = { timestamp: 0, isset: false };
        self.eventManager.dispatchEvent(Strings.Events.PrimaryThresholdReset, self.primaryThresholdHistory );
        self.eventManager.dispatchEvent(Strings.Events.SecondaryThresholdReset, {});
    });

    return this;
};

com.marchex.audial.ThresholdMonitor.prototype.updateSettings = function(settings) {
    this.logger.write('ThresholdMonitor::updateSettings');

    var key = settings.setting;
    var prev = this.settings[key];
    this.settings[key] = settings.value;
    this.settings[key + '-prev'] = prev;

    return this;
};

com.marchex.audial.ThresholdMonitor.prototype.handleSettingsDump = function(args) {
    this.logger.write('ThresholdMonitor::handleSettingsDump');
    this.settings = args.settings;
    return this;
};

com.marchex.audial.ThresholdMonitor.prototype.handleVolumeSample = function(sample) {
    this.logger.write('ThresholdMonitor::handleVolumeSample');

    var delta = (this.primaryThresholdHistory.timestamp + (this.settings.sampleRate * 1000));

    if(sample.timestamp >= delta) {
        this.processPrimaryThreshold(sample);
    }

    this.processSecondaryThreshold(sample);
    this.processSecondaryThreshold(sample);

    return this;
};

com.marchex.audial.ThresholdMonitor.prototype.processPrimaryThreshold = function(sample) {
    this.logger.write('ThresholdMonitor::processPrimaryThreshold');

    this.primaryThresholdHistory.timestamp = sample.timestamp;
    if(sample.rms >= this.settings.primaryThreshold) {
        this.primaryThresholdHistory.first.count += 1;
        this.primaryThresholdHistory.second.count += 1;

    } else {
        if(this.primaryThresholdHistory.first.count > 0) {
            this.primaryThresholdHistory.first.count -= 1;
        }
        if(this.primaryThresholdHistory.second.count > 0) {
            this.primaryThresholdHistory.second.count -= 1;
        }
    }

    if(this.primaryThresholdHistory.first.count >= this.settings.primaryThresholdObservationCount) {
        this.primaryThresholdHistory.first.isset = true;
        this.eventManager.dispatchEvent(Strings.Events.PrimaryThresholdExceeded, this.primaryThresholdHistory );

    } else if(this.primaryThresholdHistory.first.count == 0 && this.primaryThresholdHistory.first.isset) {
        this.primaryThresholdHistory.first.isset = false;
        this.eventManager.dispatchEvent(Strings.Events.PrimaryThresholdReset, this.primaryThresholdHistory );
    }

    if(this.primaryThresholdHistory.second.count >= this.settings.secondaryThresholdObservationCount) {
        this.primaryThresholdHistory.second.isset = true;
        this.eventManager.dispatchEvent(Strings.Events.PrimaryThresholdExExceeded, this.primaryThresholdHistory );

    } else if(this.primaryThresholdHistory.second.count == 0 && this.primaryThresholdHistory.second.isset) {
        this.primaryThresholdHistory.second.isset = false;
        this.eventManager.dispatchEvent(Strings.Events.PrimaryThresholdExReset, this.primaryThresholdHistory );
    }

    return this;
};

com.marchex.audial.ThresholdMonitor.prototype.processSecondaryThreshold = function(sample) {
    this.logger.write('ThresholdMonitor::processSecondaryThreshold');
    if(sample.rms >= this.settings.secondaryThreshold) {
        this.secondaryThresholdHistory.isset = true;
        this.secondaryThresholdHistory.timestamp = sample.timestamp;
        this.eventManager.dispatchEvent(Strings.Events.SecondaryThresholdExceeded, sample);
        var self = this;
        window.setTimeout(function() {
            self.eventManager.dispatchEvent(Strings.Events.SecondaryThresholdReset, {});
        }, (this.secondaryThresholdTimeoutSeconds * 1000));
    }

    return this;
};