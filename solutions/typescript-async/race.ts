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
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });
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
  const fetchPromise = axios.get<Character>(
    `https://swapi.dev/api/people/${characterId}/`
  ).then(response => response.data);
  
  const timeoutPromise = createTimeout(timeoutMs);
  
  // Race the fetch against the timeout
  return Promise.race([fetchPromise, timeoutPromise]);
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
  const delayPromise = new Promise<Character>(resolve => {
    setTimeout(async () => {
      const response = await axios.get<Character>(
        `https://swapi.dev/api/people/${characterId}/`
      );
      resolve(response.data);
    }, delayMs);
  });
  
  return delayPromise;
}

/**
 * Main function to demonstrate Promise.race()
 */
async function mainRace(): Promise<void> {
  console.log("Demonstrating Promise.race() with timeouts...");
  
  try {
    // Example 1: Successful fetch (should complete before timeout)
    console.log('\n--- Example 1: Fast Network (should succeed) ---');
    console.log('Fetching character with 5000ms timeout...');
    const character = await fetchCharacterWithTimeout(1, 5000);
    console.log(`Success! Fetched: ${character.name}`);
  } catch (error: any) {
    console.error('Error in Example 1:', error.message);
  }
  
  try {
    // Example 2: Timeout (simulate slow network)
    console.log('\n--- Example 2: Simulated Slow Network (should timeout) ---');
    console.log('Fetching character with 1000ms delay and 500ms timeout...');
    
    const fetchPromise = fetchCharacterWithDelay(2, 1000);
    const timeoutPromise = createTimeout(500);
    
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    console.log('This line should not be reached due to timeout');
    console.log(result);
  } catch (error: any) {
    console.error('Expected error in Example 2:', error.message);
  }
  
  try {
    // Example 3: Multiple racing promises (first one wins)
    console.log('\n--- Example 3: Racing Multiple Promises ---');
    
    const promise1 = fetchCharacterWithDelay(1, 2000)
      .then(char => ({ character: char, source: 'Promise 1' }));
      
    const promise2 = fetchCharacterWithDelay(2, 1000)
      .then(char => ({ character: char, source: 'Promise 2' }));
      
    const promise3 = fetchCharacterWithDelay(3, 1500)
      .then(char => ({ character: char, source: 'Promise 3' }));
    
    console.log('Racing three promises with different delays...');
    const winner = await Promise.race([promise1, promise2, promise3]);
    
    console.log(`Winner: ${winner.source}`);
    console.log(`Character: ${winner.character.name}`);
  } catch (error: any) {
    console.error('Error in Example 3:', error.message);
  }
  
  console.log('\nPromise.race() demonstration completed.');
}

// Run the main race function
mainRace();
