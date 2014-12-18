"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.SettingSliders = function(eventManager, logger, storage) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.storage = storage;
    this.sliders = [];
    this.accordion = $('#standardSettings');
    return this;
};

com.marchex.audial.SettingSliders.prototype.init = function() {
    this.logger.write('SettingSliders::init');
    var SLIDER_CLASS_NAME = 'setting-slider';
    var sliderElements = $('.' + SLIDER_CLASS_NAME);

    for(var index = 0; index < sliderElements.length; index++) {
        this.sliders.push(new com.marchex.audial.SettingSlider(sliderElements[index], this.eventManager, this.logger, this.storage).init());
    }

    this.registerHandlers();

    return this;
};

com.marchex.audial.SettingSliders.prototype.registerHandlers = function() {
    this.logger.write('SettingSliders::registerHandlers');

    var self = this;
    this.eventManager.registerHandler(Strings.Events.SettingsRequest, function() {
        var settings = self.getSettings();
        self.eventManager.dispatchEvent(Strings.Events.SettingsDump, { settings: settings });
    });

    return this;
};

com.marchex.audial.SettingSliders.prototype.getSettings = function() {
    this.logger.write('SettingSliders::getSettings');

    var settings = {};

    for(var index = 0; index < this.sliders.length; index++) {
        var key = this.sliders[index].getKey();
        settings[key] = this.sliders[index].retrieveValue();
    }

    return settings;
};