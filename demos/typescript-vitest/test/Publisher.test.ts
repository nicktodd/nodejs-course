import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Publisher, AsyncPublisher, type MessageHandler, type AsyncMessageHandler } from '../src/Publisher.js';
import { Subscriber } from '../src/Subscriber.js';

// Mock the Subscriber module
vi.mock('../src/Subscriber.js');

// Type the mocked Subscriber for better TypeScript support
const mockSubscriber = vi.mocked(Subscriber);

describe('Publisher', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('publishMessage', () => {
    it('should publish a message to a subscriber when asked to', () => {
      // Arrange
      const message = "hello world";
      const publisher = new Publisher(Subscriber.receiveMessage);

      // Act    
      publisher.publishMessage(message);

      // Assert
      expect(Subscriber.receiveMessage).toHaveBeenCalledTimes(1);
      expect(Subscriber.receiveMessage).toHaveBeenCalledWith(message);
    });

    it('should work with custom message handlers', () => {
      // Arrange
      const customHandler = vi.fn();
      const publisher = new Publisher(customHandler);
      const testMessage = "custom message";

      // Act
      publisher.publishMessage(testMessage);

      // Assert
      expect(customHandler).toHaveBeenCalledTimes(1);
      expect(customHandler).toHaveBeenCalledWith(testMessage);
    });

    it('should handle multiple messages correctly', () => {
      // Arrange
      const handler = vi.fn();
      const publisher = new Publisher(handler);

      // Act
      publisher.publishMessage("first message");
      publisher.publishMessage("second message");

      // Assert
      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenNthCalledWith(1, "first message");
      expect(handler).toHaveBeenNthCalledWith(2, "second message");
    });
  });

  describe('setSubscriber', () => {
    it('should allow changing the subscriber function', () => {
      // Arrange
      const firstHandler = vi.fn();
      const secondHandler = vi.fn();
      const publisher = new Publisher(firstHandler);
      const message = "test message";

      // Act - publish with first handler
      publisher.publishMessage(message);
      
      // Change to second handler
      publisher.setSubscriber(secondHandler);
      publisher.publishMessage(message);

      // Assert
      expect(firstHandler).toHaveBeenCalledTimes(1);
      expect(secondHandler).toHaveBeenCalledTimes(1);
      expect(firstHandler).toHaveBeenCalledWith(message);
      expect(secondHandler).toHaveBeenCalledWith(message);
    });
  });

  describe('getSubscriberInfo', () => {
    it('should return information about named function subscribers', () => {
      // Arrange
      const publisher = new Publisher(Subscriber.receiveMessage);

      // Act
      const info = publisher.getSubscriberInfo();

      // Assert
      expect(info).toBe('Subscriber: receiveMessage');
    });

    it('should handle spy function subscribers', () => {
      // Arrange
      const spyHandler = vi.fn();
      const publisher = new Publisher(spyHandler);

      // Act
      const info = publisher.getSubscriberInfo();

      // Assert
      expect(info).toBe('Subscriber: spy');
    });

    it('should handle truly anonymous function subscribers', () => {
      // Arrange - create an actual anonymous function
      const publisher = new Publisher((message: string) => {
        console.log(message);
      });

      // Act
      const info = publisher.getSubscriberInfo();

      // Assert
      expect(info).toBe('Subscriber: anonymous function');
    });
  });
});

describe('AsyncPublisher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('publishMessage', () => {
    it('should publish messages asynchronously', async () => {
      // Arrange
      const asyncHandler = vi.fn().mockResolvedValue(undefined);
      const publisher = new AsyncPublisher(asyncHandler);
      const message = "async message";

      // Act
      await publisher.publishMessage(message);

      // Assert
      expect(asyncHandler).toHaveBeenCalledTimes(1);
      expect(asyncHandler).toHaveBeenCalledWith(message);
    });

    it('should work with the async subscriber method', async () => {
      // Arrange
      mockSubscriber.receiveMessageAsync.mockResolvedValue(undefined);
      const publisher = new AsyncPublisher(Subscriber.receiveMessageAsync);
      const message = "async test message";

      // Act
      await publisher.publishMessage(message);

      // Assert
      expect(Subscriber.receiveMessageAsync).toHaveBeenCalledTimes(1);
      expect(Subscriber.receiveMessageAsync).toHaveBeenCalledWith(message);
    });

    it('should handle rejected promises', async () => {
      // Arrange
      const error = new Error('Handler failed');
      const failingHandler = vi.fn().mockRejectedValue(error);
      const publisher = new AsyncPublisher(failingHandler);

      // Act & Assert
      await expect(publisher.publishMessage("test")).rejects.toThrow('Handler failed');
      expect(failingHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('setSubscriber', () => {
    it('should allow changing async subscribers', async () => {
      // Arrange
      const firstHandler = vi.fn().mockResolvedValue(undefined);
      const secondHandler = vi.fn().mockResolvedValue(undefined);
      const publisher = new AsyncPublisher(firstHandler);
      const message = "test message";

      // Act
      await publisher.publishMessage(message);
      publisher.setSubscriber(secondHandler);
      await publisher.publishMessage(message);

      // Assert
      expect(firstHandler).toHaveBeenCalledTimes(1);
      expect(secondHandler).toHaveBeenCalledTimes(1);
    });
  });
});