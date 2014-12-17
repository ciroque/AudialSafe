"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.SettingSliders = function(sink, logger, storage) {
    this.eventSink = sink;
    this.logger = logger;
    this.storage = storage;
    this.sliders = [];
    return this;
};

com.marchex.audial.SettingSliders.prototype.init = function() {
    this.logger.write('SettingSliders::init');
    var SLIDER_CLASS_NAME = 'setting-slider';
    var sliderElements = $('.' + SLIDER_CLASS_NAME);

    for(var index = 0; index < sliderElements.length; index++) {
        this.sliders.push(new com.marchex.audial.SettingSlider(sliderElements[index], this.eventSink, this.logger, this.storage).init());
    }

    return this;
};