"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.Audio = function(sink) {
    this.eventSink = sink;
    this.context = null;
    return this;
};

com.marchex.audial.Audio.prototype.init = function () {
    console.log('Audio::init');

    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    }

    var self = this;

    var successHandler = function(stream) {
        var context            = new AudioContext();

        self.stream             = stream;
        self.microphone         = context.createMediaStreamSource(stream);
        self.context            = self.microphone.context;
        self.scriptNode         = self.context.createScriptProcessor(4096, 1, 1);
        self.gainNode           = self.context.createGain();

        self.registerRecordingHandlers();

        // TODO: This should go away.
        //self.recorder = new Recorder(self.microphone);

        console.log('>>> REGISTERING onaudioprocess CALLBACK');
        self.scriptNode.onaudioprocess = function(e) {
            console.log('>>>>>> onaudioprocess ' + e);
        };
        console.log('>>> REGISTERED onaudioprocess CALLBACK');
    };

    var failureHandler = function (error) {
        console.log('Audio::init: Failed to get user stream: ' + JSON.stringify(error));
    };

    navigator.getUserMedia({'audio': true}, successHandler, failureHandler);

    return this;
};

com.marchex.audial.Audio.prototype.registerRecordingHandlers = function() {
    console.log('Audio::registerRecordingHandlers');

    var self = this;

    var startHandler = function(args) {
        console.log('Audio::handleStartRecordingEvent');
        self.startSource = args.source;
        self.startRecording();
    };

    var stopHandler = function(args) {
        console.log('Audio::handleStartRecordingEvent');
        self.stopSource = args.source;

        if(self.startSource !== self.stopSource) {
            console.log('Audio::handleStopRecordingEvent: ERROR: Something went wrong. startSource("' + self.startSource + '"), stopSource("' + self.stopSource + '")');
        }

        self.stopRecording();
    };

    var fileProcessedHandler = function(args) {
        console.log('Audio::registerRecordingHandlers:fileProcessedHandler: ' + JSON.stringify(args));
    };

    this.eventSink.registerHandler(Strings.Events.StartRecordingButtonClicked, startHandler);
    this.eventSink.registerHandler(Strings.Events.StopRecordingButtonClicked, stopHandler);
    this.eventSink.registerHandler(Strings.Events.AudioFileProcessed, fileProcessedHandler);

    for(var p in this.scriptNode) {
        if(this.scriptNode.hasOwnProperty(p)) {
            console.log('>>>>> ' + p + ' => ' + this.scriptNode[p]);
        }
    }

    return this;
};

com.marchex.audial.Audio.prototype.startRecording = function() {
    console.log('Audio::startRecording');
    this.microphone.connect(this.gainNode);
    //this.microphone.connect(this.context.destination);
    return this;
};

com.marchex.audial.Audio.prototype.stopRecording = function() {
    console.log('Audio::stopRecording');
    this.microphone.disconnect();
    return this;
};
