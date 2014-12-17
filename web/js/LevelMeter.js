"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.LevelMeter = function(sink, opts) {
    this.eventSink = sink;
    this.ele = document.getElementById('currentLevel');

    this.opts = opts || {
        lines               : 24, // The number of lines to draw
        angle               : 0, // The length of each line
        lineWidth           : 0.44, // The line thickness
        pointer: {
            length          : 0.9, // The radius of the inner circle
            strokeWidth     : 0.035, // The rotation offset
            color           : '#000000' // Fill color
        },
        limitMax            : 'true',   // If true, the pointer will not go past the end of the gauge
        colorStart          : '#6FADCF',   // Colors
        colorStop           : '#8FC0DA',    // just experiment with them
        strokeColor         : '#E0E0E0',   // to see which ones work best for you
        generateGradient    : true
    };

    this.gauge = new Gauge(this.ele).setOptions(opts);

    return this;
};

com.marchex.audial.LevelMeter.prototype.init = function() {
    console.log('LevelMeter::init');

    this.gauge.maxValue = 3000;
    this.gauge.animationSpeed = 12;
    this.gauge.set(1400);

    return this;
};
