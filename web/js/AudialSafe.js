"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.AudialSafe = function() {
    this.eventManager = new com.marchex.audial.EventManager();
};

com.marchex.audial.AudialSafe.prototype.init = function() {
    console.log('AudialSafe::init');

    this.audio = new com.marchex.audial.Audio(this.eventManager);

    this.audio.init();
};

$(window).load(function() {
    var audial = new com.marchex.audial.AudialSafe();
    audial.init();
});
