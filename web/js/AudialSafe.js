"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.AudialSafe = function() {

    var loggerOptions = { enabled: true };

    this.logger = new com.marchex.audial.Logger(loggerOptions);
    this.eventManager = new com.marchex.audial.EventManager(this.logger);
    this.storage = new com.marchex.audial.Storage(this.logger);
    this.settingSliders = new com.marchex.audial.SettingSliders(this.eventManager, this.logger, this.storage);
    this.masterControls = new com.marchex.audial.MasterControls(this.eventManager, this.logger);
    this.levelMeter = new com.marchex.audial.LevelMeter(this.eventManager, this.logger);
    this.audio = new com.marchex.audial.Audio(this.eventManager, this.logger);
    this.thresholdListener = new com.marchex.audial.ThresholdMonitor(this.eventManager, this.logger);
    this.uiWarningListener = new com.marchex.audial.UiWarningListener(this.eventManager, this.logger);
    this.dlpSwitchListener = new com.marchex.audial.DlpPowerSwitchListener(this.eventManager, this.logger);

    return this;
};

com.marchex.audial.AudialSafe.prototype.init = function() {
    this.logger.write('AudialSafe::init');

    this.settingSliders.init();
    this.masterControls.init();
    this.levelMeter.init();
    this.audio.init();
    this.thresholdListener.init();
    this.uiWarningListener.init();
    this.dlpSwitchListener.init();

    return this;
};

$(window).load(function() {
    var audial = new com.marchex.audial.AudialSafe();
    audial.init();

    testStuff();
});

function testStuff() {

}