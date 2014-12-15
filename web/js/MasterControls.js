"use strict";

var com = com || {};
com.marchex = com.marchex || {};
com.marchex.audial = com.marchex.audial || {};

com.marchex.audial.MasterControls = function(sink) {
    this.eventManager = sink;
    this.startListeningButton = $('#startListening');
    this.stopListeningButton = $('#stopListening');
    return this;
};

com.marchex.audial.MasterControls.prototype.init = function() {

    var self = this;
    this.startListeningButton.click(function() {
        self.eventManager.dispatchEvent(Strings.Events.StartRecordingButtonClicked, {});
        self.startListeningButton.prop('disabled', true);
        self.stopListeningButton.prop('disabled', false);
    });

    this.stopListeningButton.click(function() {
        self.eventManager.dispatchEvent(Strings.Events.StopRecordingButtonClicked, {});
        self.startListeningButton.prop('disabled', false);
        self.stopListeningButton.prop('disabled', true);
    });

    return this;
};