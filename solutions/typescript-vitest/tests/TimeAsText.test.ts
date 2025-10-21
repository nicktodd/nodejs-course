import { describe, it, expect } from 'vitest';
import { TimeAsText, Time } from '../src/TimeAsText.js';

/**
 * Test suite for TimeAsText class
 * 
 * This solution includes tests for midnight and midday.
 * Students can add more tests to cover additional time formats.
 */
describe('TimeAsText', () => {
  describe('getTimeAsText', () => {
    it('should return "midnight" for 00:00:00', () => {
      // Arrange
      const time: Time = { hour: 0, minute: 0, second: 0 };
      
      // Act
      const result = TimeAsText.getTimeAsText(time);
      
      // Assert
      expect(result).toBe('midnight');
    });

    it('should return "midday" for 12:00:00', () => {
      // Arrange
      const time: Time = { hour: 12, minute: 0, second: 0 };
      
      // Act
      const result = TimeAsText.getTimeAsText(time);
      
      // Assert
      expect(result).toBe('midday');
    });

    // TODO: Students can add more tests for:
    // - Minutes past midnight (e.g., 00:30:00)
    // - Minutes past midday (e.g., 12:45:00)
    // - Morning times (e.g., 08:15:00)
    // - Afternoon times (e.g., 14:30:00)
    // - Evening times (e.g., 20:45:00)
    // - Edge cases (e.g., 23:59:59)
  });
});
