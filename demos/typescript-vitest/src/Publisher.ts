/**
 * Message handling types
 */
export type MessageHandler = (message: string) => void;
export type AsyncMessageHandler = (message: string) => Promise<void>;

/**
 * Publisher class demonstrating the Observer pattern
 * Used to show mocking of function dependencies
 */
export class Publisher {
  private subscriber: MessageHandler;

  /**
   * Creates a Publisher with a message handler
   * @param subscriber - Function to handle published messages
   */
  constructor(subscriber: MessageHandler) {
    this.subscriber = subscriber;
  }

  /**
   * Publishes a message to the subscriber
   * @param message - Message to publish
   */
  publishMessage(message: string): void {
    this.subscriber(message);
  }

  /**
   * Updates the subscriber function
   * @param newSubscriber - New message handler function
   */
  setSubscriber(newSubscriber: MessageHandler): void {
    this.subscriber = newSubscriber;
  }

  /**
   * Gets information about the current subscriber
   * @returns String description of subscriber
   */
  getSubscriberInfo(): string {
    return `Subscriber: ${this.subscriber.name || 'anonymous function'}`;
  }
}

/**
 * Async version of Publisher for demonstrating async mocking
 */
export class AsyncPublisher {
  private subscriber: AsyncMessageHandler;

  constructor(subscriber: AsyncMessageHandler) {
    this.subscriber = subscriber;
  }

  /**
   * Asynchronously publishes a message
   * @param message - Message to publish
   * @returns Promise that resolves when message is processed
   */
  async publishMessage(message: string): Promise<void> {
    await this.subscriber(message);
  }

  setSubscriber(newSubscriber: AsyncMessageHandler): void {
    this.subscriber = newSubscriber;
  }
}