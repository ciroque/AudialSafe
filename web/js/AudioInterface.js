"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.Audio = function(eventManager, logger) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.context = null;
    return this;
};

com.marchex.audial.Audio.prototype.init = function () {
    this.logger.write('Audio::init');

    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    }

    var self = this;

    var successHandler = function(stream) {
        var context             = new AudioContext();

        self.stream             = stream;
        self.microphone         = context.createMediaStreamSource(stream);
        self.context            = self.microphone.context;
        self.scriptNode         = self.context.createScriptProcessor(4096, 1, 1);

        self.registerHandlers();

        self.scriptNode.onaudioprocess = function(audioProcessEvent) {
            self.logger.write('scriptNode::onaudioprocess ' + audioProcessEvent.target);

            var buffer = audioProcessEvent.inputBuffer.getChannelData(0);
            var length = buffer.length;
            var sum = 0;
            for(var index = 0; index < length; index++) {
                var value = buffer[index];
                sum += value * value;
            }

            var rms = Math.sqrt(sum / length) * 1000;

            self.eventManager.dispatchEvent(Strings.Events.VolumeSample, { rms: rms, timestamp: audioProcessEvent.timeStamp });
        };
    };

    var failureHandler = function (error) {
        self.logger.write('Audio::init: Failed to get user stream: ' + JSON.stringify(error));
    };

    navigator.getUserMedia({'audio': true}, successHandler, failureHandler);

    return this;
};

com.marchex.audial.Audio.prototype.registerHandlers = function() {
    this.logger.write('Audio::registerHandlers');

    var self = this;

    var startHandler = function(args) {
        self.logger.write('Audio::handleStartRecordingEvent');
        self.startSource = args.source;
        self.startRecording();
    };

    var stopHandler = function(args) {
        self.logger.write('Audio::handleStartRecordingEvent');
        self.stopSource = args.source;

        if(self.startSource !== self.stopSource) {
            self.logger.write('Audio::handleStopRecordingEvent: ERROR: Something went wrong. startSource("' + self.startSource + '"), stopSource("' + self.stopSource + '")');
        }

        self.stopRecording();
    };

    this.eventManager.registerHandler(Strings.Events.StartRecordingButtonClicked, startHandler);
    this.eventManager.registerHandler(Strings.Events.StopRecordingButtonClicked, stopHandler);

    return this;
};

com.marchex.audial.Audio.prototype.startRecording = function() {
    this.logger.write('Audio::startRecording');

    this.microphone.connect(this.scriptNode);
    this.scriptNode.connect(this.context.destination);

    return this;
};

com.marchex.audial.Audio.prototype.stopRecording = function() {
    this.logger.write('Audio::stopRecording');

    this.microphone.disconnect(this.scriptNode);
    this.scriptNode.disconnect(this.context.destination);

    return this;
};
