const sub = require("./Subscriber")

class Publisher {

    constructor() {
        subscriber = sub.receiveMessage; 
    }
    
    publishMessage(message) {
        this.subscriber(message);
    }
     

}

export default Publisher;