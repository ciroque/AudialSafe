"use strict";

var Strings = {
    Events: {
        AppReset                    : 'app-reset',
        PrimaryThresholdExceeded    : 'primary-threshold-exceeded',
        PrimaryThresholdReset       : 'primary-threshold-reset',
        PrimaryThresholdExExceeded  : 'primary-threshold-ex-exceeded',
        PrimaryThresholdExReset     : 'primary-threshold-ex-reset',
        SecondaryThresholdExceeded  : 'secondary-threshold-exceeded',
        SecondaryThresholdReset     : 'secondary-threshold-reset',
        SettingChanged              : 'setting-changed',
        SettingsDump                : 'settings-dump',
        SettingsRequest             : 'settings-request',
        StartRecordingButtonClicked : 'start-recording-button-clicked',
        StopRecordingButtonClicked  : 'stop-recording-button-clicked',
        VolumeSample                : 'volume-sample'
    },
    LocalStoreKeys: {
        SettingKey                  : 'setting-'   // NOTE: the setting-specific name will be appended for uniqueness.
    }
};