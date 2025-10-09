/**
 * ASYNC/AWAIT EXAMPLE - TypeScript
 * 
 * This file demonstrates working with async/await in TypeScript.
 */
import axios from 'axios';

// Define TypeScript interfaces for API responses
interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents: string[];
}

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  birth_year: string;
  homeworld: string;
}

// Async function to fetch a Star Wars character by ID
async function fetchCharacterAsync(id: number): Promise<Character> {
  try {
    console.log(`Fetching character with ID ${id}...`);
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    console.log(`Successfully retrieved character ${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching character ${id}:`, error.message);
    throw new Error(`Failed to fetch character ${id}: ${error.message}`);
  }
}

// Async function to get a planet by URL
async function fetchPlanetByUrlAsync(url: string): Promise<Planet> {
  try {
    console.log(`Fetching planet from ${url}...`);
    const response = await axios.get(url);
    console.log(`Successfully retrieved planet`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching planet:`, error.message);
    throw new Error(`Failed to fetch planet: ${error.message}`);
  }
}

// Function to fetch a character and their home planet - demonstrates async/await pattern
async function fetchCharacterWithHomeworldAsync(id: number): Promise<{character: Character, homeworld: Planet}> {
  try {
    // First, fetch the character
    const character = await fetchCharacterAsync(id);
    
    // Then fetch their homeworld
    console.log(`Fetching homeworld for ${character.name}...`);
    const planet = await fetchPlanetByUrlAsync(character.homeworld);
    
    // Return both the character and planet data
    return {
      character,
      homeworld: planet
    };
  } catch (error: any) {
    console.error(`Error fetching character ${id} with homeworld:`, error.message);
    throw error;
  }
}

// Async/await demonstration with proper error handling
async function demoAsyncAwait(): Promise<void> {
  console.log("=== Async/Await Demo Start ===");
  
  try {
    // Example 1: Basic async/await usage
    console.log("\nExample 1: Basic Async/Await");
    const character = await fetchCharacterAsync(1);
    console.log(`Character name: ${character.name}`);
    console.log(`Birth year: ${character.birth_year}`);
    
    // Example 2: Sequential async operations
    console.log("\nExample 2: Sequential Async Operations");
    const data = await fetchCharacterWithHomeworldAsync(1);
    console.log(`Character: ${data.character.name}`);
    console.log(`Homeworld: ${data.homeworld.name}`);
    console.log(`Climate: ${data.homeworld.climate}`);
    console.log(`Population: ${data.homeworld.population}`);
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
  
  // Example 3: Handling errors with try/catch
  console.log("\nExample 3: Error Handling with try/catch");
  try {
    const invalidCharacter = await fetchCharacterAsync(999); // This ID doesn't exist
    console.log("This shouldn't execute");
    console.log(invalidCharacter);
  } catch (error: any) {
    console.log(`Error caught successfully: ${error.message}`);
  }
  
  console.log("\n=== Async/Await Demo End ===");
}

// Run the async demo
demoAsyncAwait();
