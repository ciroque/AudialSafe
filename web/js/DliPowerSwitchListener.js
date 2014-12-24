"use strict";

var org = org || {};
org.ciroque = org.ciroque || {};
org.ciroque.audial = org.ciroque.audial || {};

org.ciroque.audial.DliPowerSwitchListener = function(eventManager, logger, opts) {
    this.OUTLET_ON = 'ON';
    this.OUTLET_OFF = 'OFF';
    this.opts = opts || { switchAddress: '192.168.0.100', firstLightOutlet: 1, secondLightOutlet: 2 };
    this.eventManager = eventManager;
    this.logger = logger;
    this.primarySet = false;
    return this;
};

org.ciroque.audial.DliPowerSwitchListener.prototype.init = function() {
    this.logger.write('DliPowerSwitchListener::init');

    this.registerHandlers();

    return this;
};

org.ciroque.audial.DliPowerSwitchListener.prototype.registerHandlers = function() {
    this.logger.write('DliPowerSwitchListener::registerHandlers');

    var self = this;

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExceeded, function() {
        self.primarySet = true;
        self.sendControlMessageToSwitch(self.opts.firstLightOutlet, self.OUTLET_ON);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdReset, function() {
        self.primarySet = false;
        self.sendControlMessageToSwitch(self.opts.firstLightOutlet, self.OUTLET_OFF);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExExceeded, function() {
        self.primarySet = true;
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, self.OUTLET_ON);
    });

    this.eventManager.registerHandler(Strings.Events.PrimaryThresholdExReset, function() {
        self.primarySet = false;
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, self.OUTLET_OFF);
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdExceeded, function() {
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, self.OUTLET_ON);
    });

    this.eventManager.registerHandler(Strings.Events.SecondaryThresholdReset, function() {
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, self.OUTLET_OFF);
    });

    this.eventManager.registerHandler(Strings.Events.StopRecordingButtonClicked, function() {
        allOff();
    });

    this.eventManager.registerHandler(Strings.Events.AppReset, function() {
        allOff();
    });

    function allOff() {
        self.sendControlMessageToSwitch(self.opts.firstLightOutlet, self.OUTLET_OFF);
        self.sendControlMessageToSwitch(self.opts.secondLightOutlet, self.OUTLET_OFF);
    }

    return this;
};

org.ciroque.audial.DliPowerSwitchListener.prototype.sendControlMessageToSwitch = function(outlet, state) {
    this.logger.write('DLI> DliPowerSwitchListener::sendControlMessageToSwitch ==> ' + state );


    var self = this;

    var data = outlet + '=' + state;
    var url = 'http://' + this.opts.switchAddress + '/outlet?' + data;

    console.log('DLI> [url(' + url + ')]');

    $.ajax({
        url: url,
        username: 'admin',
        password: '1234',
        xhrFields: {
            withCredentials: true
        },
        success: function() { self.logger.write('DLI> Called the DLI Logger successfully! outlet(' + outlet + '), state(' + state + ')'); },
        error: function(xhr, ajaxOptions, error) { self.logger.write('DLI> ERROR Calling the DLI Logger! [error(' + error + ')][xhr(' + xhr + ')][ajaxOptions(' + ajaxOptions + ')][url(' + url + ')][outlet(' + outlet + ')][state(' + state + ')]'); }
    });

    //$.ajax({
    //    url: url,
    //    type: 'GET',
    //    //data: data,
    //    //dataType: 'application/json; charset=utf-8',
    //    //username: 'admin',
    //    //password: '1234',
    //    //processData: false,
    //    //contentType: 'application/json',
    //        self.logger.write('DLI> ERROR Calling the DLI Logger! [error(' + error + ')][xhr(' + xhr + ')][ajaxOptions(' + ajaxOptions + ')][url(' + url + ')][outlet(' + outlet + ')][state(' + state + ')]');
    //    }
    //});

    this.logger.write('USED URL: ' + url);

    return this;
};