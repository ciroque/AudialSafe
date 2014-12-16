"use strict";

var Strings = {
    Events: {
        AudioFileProcessed          : 'audio-file-processed',
        AudioFileReady              : 'audio-file-ready',
        SettingChanged              : 'setting-changed',
        StartRecordingButtonClicked : 'start-recording-button-clicked',
        StopRecordingButtonClicked  : 'stop-recording-button-clicked'
    },
    LocalStoreKeys: {
        SettingKey                  : 'setting-'   // NOTE: the setting-specific name will be appended for uniqueness.
    }
};