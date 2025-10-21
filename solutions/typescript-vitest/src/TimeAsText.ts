/**
 * Represents a time of day
 */
export interface Time {
  hour: number;    // 0-23
  minute: number;  // 0-59
  second: number;  // 0-59
}

/**
 * Converts time objects into human-readable text
 * 
 * This is a basic solution that handles midnight and midday.
 * Students can expand this to handle more time formats.
 */
export class TimeAsText {
  /**
   * Converts a time object to descriptive text
   * @param time - Time object with hour, minute, and second properties
   * @returns Human-readable time description
   */
  static getTimeAsText(time: Time): string {
    // Handle midnight (00:00:00)
    if (time.hour === 0 && time.minute === 0) {
      return "midnight";
    }
    
    // Handle midday (12:00:00)
    if (time.hour === 12 && time.minute === 0) {
      return "midday";
    }
    
    // TODO: Students can expand to handle:
    // - Minutes past midnight (e.g., "30 minutes past midnight")
    // - Minutes past midday (e.g., "15 minutes past midday")
    // - Morning times (e.g., "45 minutes past 8 AM")
    // - Afternoon/evening times (e.g., "20 minutes past 3 PM")
    
    return "time not implemented";
  }
}
