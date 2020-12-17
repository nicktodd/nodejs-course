const speakingClock = require('./SpeakingClock.js');


test('returns midnight when provided with a midnight time', () => {
  expect(speakingClock.getTimeAsText(new Date(2020,12,2,0,0))).toBe("midnight");
});

test('returns midday when provided with a Midday time', () => {
  expect(speakingClock.getTimeAsText(new Date(2020,12,2,12,0))).toBe("midday");
});