"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.SettingSlider = function(ele, sink, logger, storage) {
    this.eventSink = sink;
    this.logger = logger;
    this.storage = storage;
    this.ele = $(ele);
    this.input = $(ele).find('input[type=range]');
    this.key = this.input.attr('id');
    this.valueDisplay = $(ele).find('.val-disp');
    return this;
};

com.marchex.audial.SettingSlider.prototype.init = function() {
    this.logger.write('SettingSlider::init');

    this.setInitialValue();

    var self = this;

    this.ele.change(function() {
        var newValue = self.input.val();
        self.valueDisplay.text(newValue);
        self.storeValue();
        self.eventSink.dispatchEvent(Strings.Events.SettingChanged, { value: newValue, setting: self.key });
    });

    return this;
};

com.marchex.audial.SettingSlider.prototype.setInitialValue = function() {
    var value = this.retrieveValue() || 200;
    this.input.val(value);
    this.valueDisplay.text(this.input.val());
    return this;
};

com.marchex.audial.SettingSlider.prototype.storeValue = function() {
    this.storage.store(Strings.LocalStoreKeys.SettingKey + this.key, this.input.val());
    return this;
};

com.marchex.audial.SettingSlider.prototype.retrieveValue = function() {
    return this.storage.retrieve(Strings.LocalStoreKeys.SettingKey + this.key);
};

