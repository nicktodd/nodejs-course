const Clock = require("../src/Clock");
const SpeechEngine = require("../src/SpeechEngine");
const TimeAsText = require("../src/TimeAsText");
const SpeakingClock = require("../src/SpeakingClock");

jest.mock("../src/Clock");
jest.mock("../src/SpeechEngine");
jest.mock("../src/TimeAsText");

it("should call the collaborators in sequence when you get the time", () => {
    // arrange
    jest.spyOn(Clock, "getTime").mockReturnValue(new Date(2019,11,1,0,0));
    jest.spyOn(TimeAsText, "getTimeAsText").mockReturnValue("midnight");
    // act
    SpeakingClock.getTime();
    // assert
    expect(SpeechEngine.sayTime).toBeCalledWith("midnight");
    expect(Clock.getTime).toBeCalledTimes(1);
    expect(TimeAsText.getTimeAsText).toBeCalledTimes(1);
    expect(SpeechEngine.sayTime).toBeCalledTimes(1);
});