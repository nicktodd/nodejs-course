const sub = require("./Subscriber")

class Publisher {

    constructor(subscriber) {
        this.subscriber = subscriber; 
    }
    
    publishMessage(message) {
        this.subscriber(message);
    }
     

}

module.exports = Publisher;