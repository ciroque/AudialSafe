"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.ThresholdListener = function(eventManager, logger) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.settings = null;
    this.primaryThresholdHistory = { count: 0, timestamp: 0, isset: false };
    this.secondaryThresholdTimeoutSeconds = 3;
    return this;
};

com.marchex.audial.ThresholdListener.prototype.init = function() {
    this.logger.write('ThresholdListener::init');
    this.registerHandlers();

    this.eventManager.dispatchEvent(Strings.Events.SettingsRequest, {});

    return this;
};

com.marchex.audial.ThresholdListener.prototype.registerHandlers = function() {
    this.logger.write('ThresholdListener::registerHandlers');

    var self = this;

    this.eventManager.registerHandler(Strings.Events.SettingsDump, function(args) {
        self.handleSettingsDump(args);
    });

    this.eventManager.registerHandler(Strings.Events.VolumeSample, function(args) {
        self.handleVolumeSample(args);
    });

    this.eventManager.registerHandler(Strings.Events.SettingChanged, function(args) {
        self.updateSettings(args);
    });

    return this;
};

com.marchex.audial.ThresholdListener.prototype.updateSettings = function(settings) {
    this.logger.write('ThresholdListener::updateSettings');

    var key = settings.setting;
    var prev = this.settings[key];
    this.settings[key] = settings.value;
    this.settings[key + '-prev'] = prev;

    return this;
};

com.marchex.audial.ThresholdListener.prototype.handleSettingsDump = function(args) {
    this.settings = args.settings;
    return this;
};

com.marchex.audial.ThresholdListener.prototype.handleVolumeSample = function(sample) {
    this.logger.write('ThresholdListener::handleVolumeSample ' + JSON.stringify(sample));

    var delta = (this.primaryThresholdHistory.timestamp + (this.settings.sampleRate * 1000));

    if(sample.timestamp >= delta) {
        this.processPrimaryThreshold(sample);
        this.processSecondaryThreshold(sample);
    }

    return this;
};

com.marchex.audial.ThresholdListener.prototype.processPrimaryThreshold = function(sample) {
    this.primaryThresholdHistory.timestamp = sample.timestamp;
    if(sample.rms >= this.settings.primaryThreshold) {
        this.primaryThresholdHistory.count += 1;

    } else {
        if(this.primaryThresholdHistory.count > 0) {
            this.primaryThresholdHistory.count -= 1;
        }
    }

    if(this.primaryThresholdHistory.count >= this.settings.primaryThreshold) {
        this.primaryThresholdHistory.isset = true;
        this.eventManager.dispatchEvent(Strings.Events.PrimaryThresholdExceeded, this.primaryThresholdHistory );

    } else if(this.primaryThresholdHistory.count == 0 && this.primaryThresholdHistory.isset) {
        this.primaryThresholdHistory.isset = false;
        this.eventManager.dispatchEvent(Strings.Events.PrimaryThresholdReset, this.primaryThresholdHistory );
    }

    return this;
};

com.marchex.audial.ThresholdListener.prototype.processSecondaryThreshold = function(sample) {
    if(sample.rms >= this.settings.secondaryThreshold) {
        this.eventManager.dispatchEvent(Strings.Events.SecondaryThresholdExceeded, sample);
    } else {
        var now = new Date().getMilliseconds();
        var delta = sample.timestamp + this.secondaryThresholdTimeoutSeconds;
        if(now > delta) {
            this.eventManager.dispatchEvent(Strings.Events.SecondaryThresholdReset, sample);
        }
    }

    return this;
};