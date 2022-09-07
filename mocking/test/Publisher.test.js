const Subscriber = require("../src/Subscriber");
const Publisher = import("../src/Publisher");

jest.mock("../src/Subscriber");


it("should publish a message to a subscriber when asked to", () => {
    // arrange
    let message = "hello world";
    let publisher = new Publisher.Publisher(Subscriber);
    // act    
    publisher.publish(message);
    // assert
    expect(Subscriber.receiveMessage).toBeCalledTimes(1);
});