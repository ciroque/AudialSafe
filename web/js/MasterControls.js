"use strict";

var org = org || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.MasterControls = function(eventManager, logger) {
    this.eventManager = eventManager;
    this.logger = logger;
    this.startListeningButton = $('#startListening');
    this.stopListeningButton = $('#stopListening');
    this.resetAppButton = $('#resetApp');
    this.statusImage = $('#recordingStatus');
    return this;
};

org.ciroque.audial.MasterControls.prototype.init = function() {
    this.logger.write('MasterControls::init');

    var self = this;
    this.startListeningButton.click(function() {
        self.startListeningButton.prop('disabled', true);
        self.stopListeningButton.prop('disabled', false);
        self.resetAppButton.prop('disabled', true);
        self.statusImage.attr('src', 'img/recording-hot.svg');
        self.eventManager.dispatchEvent(Strings.Events.StartRecordingButtonClicked, {});
    });

    this.stopListeningButton.click(function() {
        self.startListeningButton.prop('disabled', false);
        self.stopListeningButton.prop('disabled', true);
        self.resetAppButton.prop('disabled', false);
        self.statusImage.attr('src', 'img/recording-cold.svg');
        self.eventManager.dispatchEvent(Strings.Events.StopRecordingButtonClicked, {});
    });

    this.resetAppButton.click(function() {
        self.eventManager.dispatchEvent(Strings.Events.AppReset, {});
    });

    return this;
};
