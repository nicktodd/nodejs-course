import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Subscriber } from '../src/Subscriber.js';

describe('Subscriber', () => {
  // Store original console.log to restore after tests
  const originalConsoleLog = console.log;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console.log to verify output without cluttering test results
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.log after each test
    consoleLogSpy.mockRestore();
  });

  describe('receiveMessage', () => {
    it('should log received messages', () => {
      // Arrange
      const message = "test message";

      // Act
      Subscriber.receiveMessage(message);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(`[Subscriber] Received: ${message}`);
    });

    it('should handle empty messages', () => {
      // Arrange
      const message = "";

      // Act
      Subscriber.receiveMessage(message);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith("[Subscriber] Received: ");
    });
  });

  describe('receiveMessageAsync', () => {
    it('should asynchronously process messages', async () => {
      // Arrange
      const message = "async test message";

      // Act
      await Subscriber.receiveMessageAsync(message);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(`[Async Subscriber] Received: ${message}`);
    });

    it('should handle timing correctly', async () => {
      // Arrange
      const message = "timing test";
      const startTime = Date.now();

      // Act
      await Subscriber.receiveMessageAsync(message);
      const endTime = Date.now();

      // Assert
      const duration = endTime - startTime;
      expect(duration).toBeGreaterThanOrEqual(100); // Should take at least 100ms
      expect(consoleLogSpy).toHaveBeenCalledWith(`[Async Subscriber] Received: ${message}`);
    });
  });

  describe('receiveMessageWithConfirmation', () => {
    it('should return a confirmation message', () => {
      // Arrange
      const message = "confirm this message";

      // Act
      const result = Subscriber.receiveMessageWithConfirmation(message);

      // Assert
      expect(result).toBe(`Confirmed: ${message}`);
      expect(consoleLogSpy).toHaveBeenCalledWith(`[Subscriber] Processing: ${message}`);
    });

    it('should handle various message types', () => {
      // Test different message formats
      const messages = [
        "simple message",
        "message with numbers 123",
        "message with symbols !@#$%",
        "multi word message here"
      ];

      messages.forEach((message) => {
        const result = Subscriber.receiveMessageWithConfirmation(message);
        expect(result).toBe(`Confirmed: ${message}`);
      });

      expect(consoleLogSpy).toHaveBeenCalledTimes(messages.length);
    });
  });

  describe('validateMessage', () => {
    it('should return true for valid messages', () => {
      const validMessages = [
        "hello",
        "hello world", 
        "a",
        "message with multiple words",
        "123",
        "symbols!@#"
      ];

      validMessages.forEach((message) => {
        expect(Subscriber.validateMessage(message)).toBe(true);
      });
    });

    it('should return false for invalid messages', () => {
      const invalidMessages = [
        "",
        "   ",
        "\t\n",
        "     \n\t    "
      ];

      invalidMessages.forEach((message) => {
        expect(Subscriber.validateMessage(message)).toBe(false);
      });
    });

    it('should handle edge cases', () => {
      // Edge cases that should be valid
      expect(Subscriber.validateMessage("a")).toBe(true);
      expect(Subscriber.validateMessage(" a ")).toBe(true); // Has content after trim
      
      // Edge cases that should be invalid
      expect(Subscriber.validateMessage(" ")).toBe(false);
      expect(Subscriber.validateMessage("\n")).toBe(false);
      expect(Subscriber.validateMessage("\t")).toBe(false);
    });
  });
});