import { describe, it, expect, vi } from 'vitest';
import { TimeAsText } from '../src/TimeAsText.js';
import type { Time } from '../src/Clock.js';

describe('TimeAsText', () => {
  describe('getTimeAsText', () => {
    it('should return "midnight" for 00:00', () => {
      // Arrange
      const time: Time = { hour: 0, minute: 0, second: 0 };

      // Act
      const result = TimeAsText.getTimeAsText(time);

      // Assert
      expect(result).toBe("midnight");
    });

    it('should return "midday" for 12:00', () => {
      // Arrange
      const time: Time = { hour: 12, minute: 0, second: 0 };

      // Act
      const result = TimeAsText.getTimeAsText(time);

      // Assert
      expect(result).toBe("midday");
    });

    it('should handle minutes past midnight', () => {
      // Arrange
      const time: Time = { hour: 0, minute: 30, second: 0 };

      // Act
      const result = TimeAsText.getTimeAsText(time);

      // Assert
      expect(result).toBe("30 minutes past midnight");
    });

    it('should handle minutes past midday', () => {
      // Arrange
      const time: Time = { hour: 12, minute: 45, second: 0 };

      // Act
      const result = TimeAsText.getTimeAsText(time);

      // Assert
      expect(result).toBe("45 minutes past midday");
    });

    it('should handle AM hours', () => {
      // Arrange
      const time: Time = { hour: 9, minute: 15, second: 0 };

      // Act
      const result = TimeAsText.getTimeAsText(time);

      // Assert
      expect(result).toBe("15 minutes past 9 AM");
    });

    it('should handle PM hours', () => {
      // Arrange
      const time: Time = { hour: 15, minute: 30, second: 0 };

      // Act
      const result = TimeAsText.getTimeAsText(time);

      // Assert
      expect(result).toBe("30 minutes past 3 PM");
    });

    it('should handle edge cases', () => {
      // Test various edge cases
      expect(TimeAsText.getTimeAsText({ hour: 23, minute: 59, second: 59 }))
        .toBe("59 minutes past 11 PM");
      
      expect(TimeAsText.getTimeAsText({ hour: 1, minute: 0, second: 0 }))
        .toBe("0 minutes past 1 AM");
      
      expect(TimeAsText.getTimeAsText({ hour: 13, minute: 1, second: 0 }))
        .toBe("1 minutes past 1 PM");
    });
  });

  describe('getDateAsText', () => {
    it('should convert Date objects to text correctly', () => {
      // Arrange
      const date = new Date(2023, 0, 1, 14, 30, 45); // January 1, 2023, 2:30:45 PM

      // Act
      const result = TimeAsText.getDateAsText(date);

      // Assert
      expect(result).toBe("30 minutes past 2 PM");
    });

    it('should handle midnight dates', () => {
      // Arrange
      const date = new Date(2023, 5, 15, 0, 0, 0); // June 15, 2023, midnight

      // Act
      const result = TimeAsText.getDateAsText(date);

      // Assert
      expect(result).toBe("midnight");
    });
  });
});