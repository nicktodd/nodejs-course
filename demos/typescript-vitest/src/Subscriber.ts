/**
 * Subscriber module for handling incoming messages
 * This demonstrates mocking of module functions
 */
export class Subscriber {
  /**
   * Receives and processes a message
   * @param message - Message to process
   */
  static receiveMessage(message: string): void {
    console.log(`[Subscriber] Received: ${message}`);
  }

  /**
   * Asynchronously receives and processes a message
   * @param message - Message to process
   * @returns Promise that resolves when processing is complete
   */
  static async receiveMessageAsync(message: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[Async Subscriber] Received: ${message}`);
        resolve();
      }, 100);
    });
  }

  /**
   * Receives a message and returns a confirmation
   * @param message - Message to process
   * @returns Confirmation string
   */
  static receiveMessageWithConfirmation(message: string): string {
    console.log(`[Subscriber] Processing: ${message}`);
    return `Confirmed: ${message}`;
  }

  /**
   * Validates a message format
   * @param message - Message to validate
   * @returns boolean indicating if message is valid
   */
  static validateMessage(message: string): boolean {
    return Boolean(message && message.length > 0 && message.trim().length > 0);
  }
}