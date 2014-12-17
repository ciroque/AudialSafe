"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.MasterControls = function(sink, logger) {
    this.eventManager = sink;
    this.logger = logger;
    this.startListeningButton = $('#startListening');
    this.stopListeningButton = $('#stopListening');
    this.statusImage = $('#recordingStatus');
    return this;
};

com.marchex.audial.MasterControls.prototype.init = function() {

    var self = this;
    this.startListeningButton.click(function() {
        self.startListeningButton.prop('disabled', true);
        self.stopListeningButton.prop('disabled', false);
        self.statusImage.attr('src', 'img/recording-hot.svg');
        self.eventManager.dispatchEvent(Strings.Events.StartRecordingButtonClicked, {});
    });

    this.stopListeningButton.click(function() {
        self.startListeningButton.prop('disabled', false);
        self.stopListeningButton.prop('disabled', true);
        self.statusImage.attr('src', 'img/recording-cold.svg');
        self.eventManager.dispatchEvent(Strings.Events.StopRecordingButtonClicked, {});
    });

    return this;
};