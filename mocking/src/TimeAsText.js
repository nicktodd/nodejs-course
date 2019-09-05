module.exports = {

    getTimeAsText: (time) => {

        if (time.hour == 0 && time.minute == 0) {
            return "midnight";
        }
        else if (time.hour == 12 && time.minute == 0) {
            return "midday";
        }
        else {
            return "unknown";
        }

    } 

}