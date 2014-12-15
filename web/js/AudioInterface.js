"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.Audio = function(sink) {
    this.eventSink = sink;
    this.context = null;
    this.recorder = null;
    return this;
};

com.marchex.audial.Audio.prototype.init = function () {
    console.log('Audio::init');

    var self = this;

    var successHandler = function (stream) {
        self.stream = stream;
        self.context = new AudioContext();
        self.microphone = self.context.createMediaStreamSource(stream);
        self.recorder = new Recorder(self.microphone);
    };

    var failureHandler = function (error) {
        console.log('Audio::init: Failed to get user stream: ' + JSON.stringify(error));
    };

    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    }

    navigator.getUserMedia({'audio': true}, successHandler, failureHandler);

    this.registerRecordingHandlers();

    return this;
};

com.marchex.audial.Audio.prototype.registerRecordingHandlers = function() {

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
        self.recorder.clear();
    };

    this.eventSink.registerHandler(Strings.Events.StartRecordingButtonClicked, startHandler);
    this.eventSink.registerHandler(Strings.Events.StopRecordingButtonClicked, stopHandler);
    this.eventSink.registerHandler(Strings.Events.AudioFileProcessed, fileProcessedHandler);

    return this;
};

com.marchex.audial.Audio.prototype.startRecording = function() {
    console.log('Audio::startRecording');

    console.log('!!!!!!>> context(' + this.context + ') microphone(' + this.microphone + ') stream(' + this.stream + ')');
    this.microphone.connect(this.context.destination);
    this.recorder.record();
    return this;
};

com.marchex.audial.Audio.prototype.stopRecording = function() {
    console.log('Audio::stopRecording');
    var self = this;
    this.recorder.stop();
    this.microphone.disconnect();
    this.recorder.exportWAV(function(data) {
        self.eventSink.dispatchEvent(Strings.Events.AudioFileReady, { source: self.stopSource, audio: data });
    });

    return this;
};
