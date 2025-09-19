import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Clock, type Time } from '../src/Clock.js';
import { SpeechEngine } from '../src/SpeechEngine.js';
import { TimeAsText } from '../src/TimeAsText.js';
import { SpeakingClock } from '../src/SpeakingClock.js';

// Mock the modules using Vitest
vi.mock('../src/Clock.js');
vi.mock('../src/SpeechEngine.js');
vi.mock('../src/TimeAsText.js');

// Type the mocked modules for better TypeScript support
const mockClock = vi.mocked(Clock);
const mockSpeechEngine = vi.mocked(SpeechEngine);
const mockTimeAsText = vi.mocked(TimeAsText);

describe('SpeakingClock', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('getTime', () => {
    it('should call the collaborators in sequence when you get the time', () => {
      // Arrange
      const midnightDate = new Date(2019, 11, 1, 0, 0);
      const expectedTime: Time = {
        hour: 0,
        minute: 0,
        second: 0
      };

      // Mock the Clock.getTime to return our test date
      mockClock.getTime.mockReturnValue(midnightDate);
      
      // Mock TimeAsText.getTimeAsText to return "midnight"
      mockTimeAsText.getTimeAsText.mockReturnValue("midnight");

      // Act
      SpeakingClock.getTime();

      // Assert
      // Verify Clock.getTime was called exactly once
      expect(Clock.getTime).toHaveBeenCalledTimes(1);
      
      // Verify TimeAsText.getTimeAsText was called exactly once with correct time object
      expect(TimeAsText.getTimeAsText).toHaveBeenCalledTimes(1);
      expect(TimeAsText.getTimeAsText).toHaveBeenCalledWith(expectedTime);
      
      // Verify SpeechEngine.sayTime was called with "midnight"
      expect(SpeechEngine.sayTime).toHaveBeenCalledWith("midnight", undefined);
      expect(SpeechEngine.sayTime).toHaveBeenCalledTimes(1);
    });

    it('should handle midday time correctly', () => {
      // Arrange
      const middayDate = new Date(2019, 11, 1, 12, 0);
      const expectedTime: Time = {
        hour: 12,
        minute: 0,
        second: 0
      };

      mockClock.getTime.mockReturnValue(middayDate);
      mockTimeAsText.getTimeAsText.mockReturnValue("midday");

      // Act
      SpeakingClock.getTime();

      // Assert
      expect(Clock.getTime).toHaveBeenCalledTimes(1);
      expect(TimeAsText.getTimeAsText).toHaveBeenCalledWith(expectedTime);
      expect(SpeechEngine.sayTime).toHaveBeenCalledWith("midday", undefined);
    });

    it('should pass speech options to the speech engine', () => {
      // Arrange
      const testDate = new Date(2019, 11, 1, 15, 30);
      const testOptions = { voice: 'female', rate: 1.2 };
      const expectedTime: Time = {
        hour: 15,
        minute: 30,
        second: 0
      };

      mockClock.getTime.mockReturnValue(testDate);
      mockTimeAsText.getTimeAsText.mockReturnValue("30 minutes past 3 PM");

      // Act
      SpeakingClock.getTime(testOptions);

      // Assert
      expect(SpeechEngine.sayTime).toHaveBeenCalledWith("30 minutes past 3 PM", testOptions);
    });
  });

  describe('announceTime', () => {
    it('should announce a specific time without calling Clock.getTime', () => {
      // Arrange
      const specificTime: Time = { hour: 9, minute: 15, second: 30 };
      mockTimeAsText.getTimeAsText.mockReturnValue("15 minutes past 9 AM");

      // Act
      SpeakingClock.announceTime(specificTime);

      // Assert
      expect(Clock.getTime).not.toHaveBeenCalled();
      expect(TimeAsText.getTimeAsText).toHaveBeenCalledWith(specificTime);
      expect(SpeechEngine.sayTime).toHaveBeenCalledWith("15 minutes past 9 AM", undefined);
    });
  });

  describe('getCurrentTimeAsText', () => {
    it('should return current time as text without speaking', () => {
      // Arrange
      const currentDate = new Date(2019, 11, 1, 14, 45);
      mockClock.getTime.mockReturnValue(currentDate);
      mockTimeAsText.getDateAsText.mockReturnValue("45 minutes past 2 PM");

      // Act
      const result = SpeakingClock.getCurrentTimeAsText();

      // Assert
      expect(result).toBe("45 minutes past 2 PM");
      expect(Clock.getTime).toHaveBeenCalledTimes(1);
      expect(TimeAsText.getDateAsText).toHaveBeenCalledWith(currentDate);
      expect(SpeechEngine.sayTime).not.toHaveBeenCalled();
    });
  });
});