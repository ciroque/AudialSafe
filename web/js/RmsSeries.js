//"use strict";
//
//var com = com || {};
//com.marchex = com.marchex || {};
//com.marchex.audial = com.marchex.audial || {};
//
//com.marchex.audial.RmsSeries = function(eventManager, logger, eventName) {
//    this.eventManager   = eventManager;
//    this.logger         = logger;
//    this.eventName      = eventName;
//    this.size           = 0;
//    this.samples        = null;
//    return this;
//};
//
//com.marchex.audial.RmsSeries.prototype.getMostRecentTimestamp = function() {
//    if(this.samples == null || this.samples.length == 0) {
//        return 0;
//    } else {
//        return this.samples[this.samples.length - 1].timestamp;
//    }
//};
//
//com.marchex.audial.RmsSeries.prototype.setBufferLength = function(size) {
//    this.size = size;
//    return true;
//};
//
//com.marchex.audial.RmsSeries.prototype.recordSample = function(sample) {
//
//    if(this.samples == null) {
//        this.samples = [];
//    }
//
//    if(this.samples.length >= this.size) {
//        this.samples.shift();
//        console.log('>>>> SHIFTED SAMPLES');
//    }
//
//    this.samples.push(sample);
//    console.log('>>>> PUSHED SAMPLE => ' + JSON.stringify(sample) + ' :: ' + this.samples.length + ' ::: ' + this.length);
//    return this;
//};
//
//
////
////var length = 10;
////var array = [length];
////
////for(var index = 0; index < 36; index++) {
////    console.log('index(' + index + '), length(' + length + ')');
////    if(index + 1 >= length) {
////        array.shift();
////        console.log('(((( ' + array + ' ))))');
////    }
////
////    array.push(index * 3);
////}
////
////console.log('>>>>>>>>>>> ' + array.length + ' :: ' + array);