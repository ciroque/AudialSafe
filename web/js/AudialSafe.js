"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.AudialSafe = function() {
    this.eventManager = new com.marchex.audial.EventManager();
    this.storage = new com.marchex.audial.Storage();
    this.settingSliders = new com.marchex.audial.SettingSliders(this.eventManager, this.storage);
    this.masterControls = new com.marchex.audial.MasterControls(this.eventManager);
    return this;
};

com.marchex.audial.AudialSafe.prototype.init = function() {
    console.log('AudialSafe::init');

    this.audio = new com.marchex.audial.Audio(this.eventManager);
    this.audio.init();
    this.settingSliders.init();
    this.masterControls.init();

    this.eventManager.registerHandler(Strings.Events.AudioFileReady, function(args) {
        console.log(Strings.Events.AudioFileReady + ' event handler...');
    });

    return this;
};

$(window).load(function() {
    var audial = new com.marchex.audial.AudialSafe();
    audial.init();

    var opts = {
        lines: 24, // The number of lines to draw
        angle: 0, // The length of each line
        lineWidth: 0.44, // The line thickness
        pointer: {
            length: 0.9, // The radius of the inner circle
            strokeWidth: 0.035, // The rotation offset
            color: '#000000' // Fill color
        },
        limitMax: 'true',   // If true, the pointer will not go past the end of the gauge
        colorStart: '#6FADCF',   // Colors
        colorStop: '#8FC0DA',    // just experiment with them
        strokeColor: '#E0E0E0',   // to see which ones work best for you
        generateGradient: true
    };
    var target = document.getElementById('currentLevel'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.animationSpeed = 12; // set animation speed (32 is default value)
    gauge.set(2100); // set actual value

    window.setInterval(function() {
        gauge.set(Math.random() * (3000 - 1) + 1)
    }, 1000);

});
