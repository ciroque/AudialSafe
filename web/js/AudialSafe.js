"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.AudialSafe = function() {
    this.eventManager = new com.marchex.audial.EventManager();
    this.storage = new com.marchex.audial.Storage();
    this.settingSliders = new com.marchex.audial.SettingSliders(this.eventManager, this.storage);
    this.masterControls = new com.marchex.audial.MasterControls(this.eventManager);
    this.levelMeter = new com.marchex.audial.LevelMeter(this.eventManager);
    return this;
};

com.marchex.audial.AudialSafe.prototype.init = function() {
    console.log('AudialSafe::init');

    this.audio = new com.marchex.audial.Audio(this.eventManager);
    this.audio.init();
    this.settingSliders.init();
    this.masterControls.init();
    this.levelMeter.init();

    this.registerEventHandlers();

    return this;
};

com.marchex.audial.AudialSafe.prototype.registerEventHandlers = function() {
    console.log('AudialSafe::registerEventHandlers');

    this.eventManager.registerHandler(Strings.Events.AudioFileReady, function(args) {
        console.log(Strings.Events.AudioFileReady + ' event handler...');
    });

    return this;
};

$(window).load(function() {
    var audial = new com.marchex.audial.AudialSafe();
    audial.init();
});
