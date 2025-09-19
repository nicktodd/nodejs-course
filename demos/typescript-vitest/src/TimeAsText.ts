import { Time } from './Clock.js';

/**
 * Converts time objects into human-readable text
 * Handles special cases like midnight and midday
 */
export class TimeAsText {
  /**
   * Converts a time object to descriptive text
   * @param time - Time object with hour and minute properties
   * @returns Human-readable time description
   */
  static getTimeAsText(time: Time): string {
    if (time.hour === 0 && time.minute === 0) {
      return "midnight";
    } else if (time.hour === 12 && time.minute === 0) {
      return "midday";
    } else if (time.hour === 0) {
      return `${time.minute} minutes past midnight`;
    } else if (time.hour === 12) {
      return `${time.minute} minutes past midday`;
    } else if (time.hour < 12) {
      return `${time.minute} minutes past ${time.hour} AM`;
    } else {
      return `${time.minute} minutes past ${time.hour - 12} PM`;
    }
  }

  /**
   * Converts a Date object to descriptive text
   * @param date - Date object to convert
   * @returns Human-readable time description
   */
  static getDateAsText(date: Date): string {
    const time: Time = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
    return this.getTimeAsText(time);
  }
}