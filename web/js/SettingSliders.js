"use strict";

var org = org || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.SettingSliders = function(eventManager, logger, storage) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.storage = storage;
    this.sliders = [];
    this.accordion = $('#standardSettings');
    return this;
};

org.ciroque.audial.SettingSliders.prototype.init = function() {
    this.logger.write('SettingSliders::init');
    var SLIDER_CLASS_NAME = 'setting-slider';
    var sliderElements = $('.' + SLIDER_CLASS_NAME);

    for(var index = 0; index < sliderElements.length; index++) {
        this.sliders.push(new org.ciroque.audial.SettingSlider(sliderElements[index], this.eventManager, this.logger, this.storage).init());
    }

    this.registerHandlers();

    return this;
};

org.ciroque.audial.SettingSliders.prototype.registerHandlers = function() {
    this.logger.write('SettingSliders::registerHandlers');

    var self = this;
    this.eventManager.registerHandler(Strings.Events.SettingsRequest, function() {
        var settings = self.getSettings();
        self.eventManager.dispatchEvent(Strings.Events.SettingsDump, { settings: settings });
    });

    return this;
};

org.ciroque.audial.SettingSliders.prototype.getSettings = function() {
    this.logger.write('SettingSliders::getSettings');

    var settings = {};

    for(var index = 0; index < this.sliders.length; index++) {
        var key = this.sliders[index].getKey();
        settings[key] = this.sliders[index].retrieveValue();
    }

    return settings;
};