
module.exports = {
    getTimeAsText: function(time) {
      if (time.getHours() == 0 && time.getMinutes() == 0) {
        return "midnight";
      }
      else if (time.getHours() == 12 && time.getMinutes() == 0){
          return "midday";
      }
      else {
        return null;
      }
    }
}