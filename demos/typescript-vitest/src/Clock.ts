/**
 * Simple clock module that provides current date/time
 * This module can be easily mocked for testing purposes
 */
export interface Time {
  hour: number;
  minute: number;
  second: number;
}

export class Clock {
  /**
   * Gets the current date and time
   * @returns Current Date object
   */
  static getTime(): Date {
    return new Date();
  }

  /**
   * Gets time as a structured object
   * @returns Time object with hour, minute, second
   */
  static getTimeAsObject(): Time {
    const now = new Date();
    return {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    };
  }
}