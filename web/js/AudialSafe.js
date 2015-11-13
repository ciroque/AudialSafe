"use strict";

var org = org || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

var ns = org.ciroque.audial;

ns.AudialSafe = function() {

    var loggerOptions = { enabled: true };
    var ns = org.ciroque.audial;

    this.logger = new ns.Logger(loggerOptions);
    this.eventManager = new ns.EventManager(this.logger);
    this.storage = new ns.Storage(this.logger);
    this.settingSliders = new ns.SettingSliders(this.eventManager, this.logger, this.storage);
    this.advancedSettings = new ns.AdvancedSettings(this.eventManager, this.logger, this.storage);
    this.masterControls = new ns.MasterControls(this.eventManager, this.logger);
    this.levelMeter = new ns.LevelMeter(this.eventManager, this.logger);
    this.audio = new ns.Audio(this.eventManager, this.logger);
    this.thresholdListener = new ns.ThresholdMonitor(this.eventManager, this.logger);
    this.uiWarningListener = new ns.UiWarningListener(this.eventManager, this.logger);
    this.dlpSwitchListener = new ns.DliPowerSwitchListener(this.eventManager, this.logger);

    return this;
};

ns.AudialSafe.prototype.init = function() {
    this.logger.write('AudialSafe::init');

    this.settingSliders.init();
    this.masterControls.init();
    this.levelMeter.init();
    this.audio.init();
    this.thresholdListener.init();
    this.uiWarningListener.init();
    this.dlpSwitchListener.init();
    this.advancedSettings.init();

    return this;
};

$(window).load(function() {
    var audial = new org.ciroque.audial.AudialSafe();
    audial.init();
});
