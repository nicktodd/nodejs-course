const Clock = require("./Clock");
const SpeechEngine = require("./SpeechEngine");
const TimeAsText = require("./TimeAsText");

module.exports = {

    getTime: () => {
        let currentTime = Clock.getTime();
        let currentTimeAsText = TimeAsText.getTimeAsText(currentTime);
        SpeechEngine.sayTime(currentTimeAsText);
    }

}