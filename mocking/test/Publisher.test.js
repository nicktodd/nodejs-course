const Publisher = require("../src/Publisher");
const Subscriber = require("../src/Subscriber");

jest.mock("../src/Subscriber");

it("should publish a message to a subscriber when asked to", () => {
    // arrange
    let message = "hello world";
    let publisher = new Publisher(Subscriber.receiveMessage);
    // act    
    publisher.publishMessage(message);
    // assert
    expect(Subscriber.receiveMessage).toBeCalledTimes(1);
});