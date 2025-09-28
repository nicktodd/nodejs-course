/**
 * PROMISE RACE EXAMPLE - TypeScript
 * 
 * This file demonstrates using Promise.race() for timeouts and other race conditions.
 */
import axios from 'axios';

// Define TypeScript interfaces for API responses
interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  birth_year: string;
  homeworld: string;
}

// Create a promise that rejects after a specified delay (for timeouts)
function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });
}

// Create a promise that resolves after a delay (for demonstration)
function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

// Fetch character data with a timeout
async function fetchCharacterWithTimeout(
  id: number,
  timeoutMs: number
): Promise<Character> {
  const fetchPromise = axios.get<Character>(
    `https://swapi.dev/api/people/${id}/`
  ).then(response => response.data);
  
  const timeoutPromise = createTimeout(timeoutMs);
  
  // Race the fetch against the timeout - whichever resolves/rejects first wins
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Demo 1: Basic Promise.race with timeout
async function demoBasicRace(): Promise<void> {
  console.log("\n=== Demo 1: Basic Promise.race with Timeout ===");
  
  // Example with sufficient timeout - should succeed
  console.log("Fetching with sufficient timeout (3000ms):");
  try {
    const character = await fetchCharacterWithTimeout(1, 3000);
    console.log(`✅ Success! Fetched ${character.name}`);
  } catch (error: any) {
    console.log(`❌ Error: ${error.message}`);
  }
  
  // Example with insufficient timeout - should fail
  console.log("\nFetching with insufficient timeout (1ms):");
  try {
    const character = await fetchCharacterWithTimeout(1, 1);
    console.log(`Success! Fetched ${character.name}`);
  } catch (error: any) {
    console.log(`✅ Expected timeout error: ${error.message}`);
  }
}

// Demo 2: Racing multiple promises
async function demoMultipleRacing(): Promise<void> {
  console.log("\n=== Demo 2: Racing Multiple Promises ===");
  
  // Create several promises with different resolution times
  interface RaceResult {
    winner: string;
    value: string;
  }
  
  const promises: Promise<RaceResult>[] = [
    delay({ winner: "Fast", value: "I resolved in 100ms" }, 100),
    delay({ winner: "Medium", value: "I resolved in 500ms" }, 500),
    delay({ winner: "Slow", value: "I resolved in 1000ms" }, 1000)
  ];
  
  console.log("Racing three promises with different delays...");
  
  // Race them to see which one resolves first
  const winner = await Promise.race(promises);
  
  console.log(`✅ Winner: ${winner.winner}`);
  console.log(`Message: ${winner.value}`);
}

// Demo 3: Practical use case - fetching from multiple sources
async function demoPracticalRace(): Promise<void> {
  console.log("\n=== Demo 3: Practical Use Case - Fetching from Multiple Sources ===");
  
  // Simulate fetching the same data from different mirrors/APIs
  async function fetchFromPrimarySource(): Promise<{source: string, data: string}> {
    // Simulate a slow primary source
    await new Promise(resolve => setTimeout(resolve, 800));
    return { source: "Primary API", data: "Luke Skywalker's Data" };
  }
  
  async function fetchFromSecondarySource(): Promise<{source: string, data: string}> {
    // Simulate a fast secondary source
    await new Promise(resolve => setTimeout(resolve, 200));
    return { source: "Secondary API", data: "Luke Skywalker's Data" };
  }
  
  async function fetchFromTertiarySource(): Promise<{source: string, data: string}> {
    // Simulate a medium-speed tertiary source
    await new Promise(resolve => setTimeout(resolve, 500));
    return { source: "Tertiary API", data: "Luke Skywalker's Data" };
  }
  
  console.log("Fetching data from multiple sources simultaneously...");
  
  // Race all sources - use the first one that responds
  const result = await Promise.race([
    fetchFromPrimarySource(),
    fetchFromSecondarySource(),
    fetchFromTertiarySource()
  ]);
  
  console.log(`✅ Got data from: ${result.source}`);
  console.log(`Data: ${result.data}`);
}

// Main function to run all demos
async function demoRace(): Promise<void> {
  console.log("=== Promise.race Demo Start ===");
  
  try {
    await demoBasicRace();
    await demoMultipleRacing();
    await demoPracticalRace();
  } catch (error: any) {
    console.error("An unexpected error occurred:", error.message);
  }
  
  console.log("\n=== Promise.race Demo End ===");
}

// Run the demo
demoRace();
