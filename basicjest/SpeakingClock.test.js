const testFile = require('./SpeakingClock.js');



test('returns midnight when provided with a midnight time', () => {
  expect(testFile.getTimeAsText(new Date(2020,12,2,0,0))).toBe("midnight");
});