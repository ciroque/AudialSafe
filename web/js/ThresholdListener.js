"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.ThresholdListener = function(sink) {
    this.eventSink = sink;

    return this;
};

com.marchex.audial.ThresholdListener.prototype.init = function() {
    this.logger.write('ThresholdListener::init');
    return this;
};