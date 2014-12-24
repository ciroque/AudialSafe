"use strict";

var org = org || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.AudialSafe = function() {

    var loggerOptions = { enabled: true };

    this.logger = new org.ciroque.audial.Logger(loggerOptions);
    this.eventManager = new org.ciroque.audial.EventManager(this.logger);
    this.storage = new org.ciroque.audial.Storage(this.logger);
    this.settingSliders = new org.ciroque.audial.SettingSliders(this.eventManager, this.logger, this.storage);
    this.advancedSettings = new org.ciroque.audial.AdvancedSettings(this.eventManager, this.logger, this.storage);
    this.masterControls = new org.ciroque.audial.MasterControls(this.eventManager, this.logger);
    this.levelMeter = new org.ciroque.audial.LevelMeter(this.eventManager, this.logger);
    this.audio = new org.ciroque.audial.Audio(this.eventManager, this.logger);
    this.thresholdListener = new org.ciroque.audial.ThresholdMonitor(this.eventManager, this.logger);
    this.uiWarningListener = new org.ciroque.audial.UiWarningListener(this.eventManager, this.logger);
    this.dlpSwitchListener = new org.ciroque.audial.DliPowerSwitchListener(this.eventManager, this.logger);

    return this;
};

org.ciroque.audial.AudialSafe.prototype.init = function() {
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

    testStuff();
});

function testStuff() {

}