import { Clock, type Time } from './Clock.js';
import { SpeechEngine, type SpeechOptions } from './SpeechEngine.js';
import { TimeAsText } from './TimeAsText.js';

/**
 * Main speaking clock implementation that coordinates all components
 * This class demonstrates dependency injection and mocking patterns
 */
export class SpeakingClock {
  /**
   * Gets current time and announces it using speech synthesis
   * This method orchestrates the Clock, TimeAsText, and SpeechEngine modules
   */
  static getTime(options?: SpeechOptions): void {
    // Get current time from Clock module
    const currentTime: Date = Clock.getTime();
    
    // Convert Date to Time object for TimeAsText processing
    const timeObj: Time = {
      hour: currentTime.getHours(),
      minute: currentTime.getMinutes(),
      second: currentTime.getSeconds()
    };
    
    // Convert time to human-readable text
    const currentTimeAsText: string = TimeAsText.getTimeAsText(timeObj);
    
    // Speak the time using the speech engine
    SpeechEngine.sayTime(currentTimeAsText, options);
  }

  /**
   * Gets a specific time and announces it
   * Useful for testing with predetermined times
   * @param time - Specific time to announce
   * @param options - Speech options
   */
  static announceTime(time: Time, options?: SpeechOptions): void {
    const timeAsText: string = TimeAsText.getTimeAsText(time);
    SpeechEngine.sayTime(timeAsText, options);
  }

  /**
   * Gets current time as text without speaking it
   * @returns Current time as human-readable text
   */
  static getCurrentTimeAsText(): string {
    const currentTime: Date = Clock.getTime();
    return TimeAsText.getDateAsText(currentTime);
  }
}