import axios from 'axios';

// Define interface for API responses
interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

/**
 * Creates a promise that rejects after a timeout
 * @param ms Timeout in milliseconds
 * @returns Promise that rejects after the timeout
 */
function createTimeout(ms: number): Promise<never> {
  // TODO: Implement this function
  // - Create a promise that rejects after ms milliseconds
  // - Return the promise
  
  throw new Error('Not implemented');
}

/**
 * Fetches character data with a timeout
 * @param characterId Character ID to fetch
 * @param timeoutMs Timeout in milliseconds
 * @returns Promise resolving to character data or rejecting with timeout
 */
async function fetchCharacterWithTimeout(
  characterId: number,
  timeoutMs: number
): Promise<Character> {
  // TODO: Implement this function
  // - Create a promise to fetch the character
  // - Create a timeout promise
  // - Use Promise.race to race the fetch against the timeout
  // - Return the result
  
  throw new Error('Not implemented');
}

/**
 * Simulates a slow network by delaying resolution
 * @param characterId Character ID to fetch
 * @param delayMs Delay in milliseconds
 * @returns Promise resolving to character data after delay
 */
async function fetchCharacterWithDelay(
  characterId: number,
  delayMs: number
): Promise<Character> {
  // TODO: Implement this function
  // - Create a promise that resolves with character data after a delay
  // - Return the promise
  
  throw new Error('Not implemented');
}

/**
 * Main function to demonstrate Promise.race()
 */
async function mainRace(): Promise<void> {
  console.log("Demonstrating Promise.race() with timeouts...");
  
  try {
    // TODO: Implement Example 1: Successful fetch (should complete before timeout)
    // - Use fetchCharacterWithTimeout with a reasonable timeout
    
    // TODO: Implement Example 2: Timeout (simulate slow network)
    // - Race a delayed fetch against a quick timeout
    
    // TODO: Implement Example 3: Racing multiple promises
    // - Create multiple promises with different delays
    // - Race them against each other
    // - Log which one wins
    
  } catch (error: any) {
    console.error('An unexpected error occurred:', error.message);
  }
}

// Run the main race function
mainRace();
