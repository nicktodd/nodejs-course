
module.exports = {
    getTimeAsText: function(time) {
      if (time.getHours() == 0 && time.getMinutes() == 0) {
        return "midnight";
      }
      else {
          return null;
      }
    }
}