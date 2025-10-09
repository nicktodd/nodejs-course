/**
 * PROMISE EXAMPLE - TypeScript
 * 
 * This file demonstrates working with Promises in TypeScript.
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

// Function to fetch a Star Wars character by ID using Promise syntax
function fetchCharacter(id: number): Promise<Character> {
  console.log(`Fetching character with ID ${id}...`);
  
  return axios.get(`https://swapi.dev/api/people/${id}/`)
    .then(response => {
      // The .then() callback runs when the promise resolves successfully
      console.log(`Successfully retrieved character ${id}`);
      return response.data;
    })
    .catch(error => {
      // The .catch() callback runs when the promise is rejected
      console.error(`Error fetching character ${id}:`, error.message);
      throw new Error(`Failed to fetch character ${id}: ${error.message}`);
    });
}

// Function to get a planet by URL using Promise syntax
function fetchPlanetByUrl(url: string): Promise<Planet> {
  console.log(`Fetching planet from ${url}...`);
  
  return axios.get(url)
    .then(response => {
      console.log(`Successfully retrieved planet`);
      return response.data;
    })
    .catch(error => {
      console.error(`Error fetching planet:`, error.message);
      throw new Error(`Failed to fetch planet: ${error.message}`);
    });
}

// Function to fetch a character and their home planet - demonstrates promise chaining
function fetchCharacterWithHomeworld(id: number): Promise<{character: Character, homeworld: Planet}> {
  // Start with the character promise
  return fetchCharacter(id)
    .then(character => {
      // Once we have the character, fetch their homeworld
      console.log(`Fetching homeworld for ${character.name}...`);
      return fetchPlanetByUrl(character.homeworld)
        .then(planet => {
          // Return both the character and planet data
          return {
            character: character,
            homeworld: planet
          };
        });
    });
}

// Promise demonstration with proper error handling
function demoPromises(): void {
  console.log("=== Promise Demo Start ===");
  
  // Example 1: Basic promise usage
  fetchCharacter(1)
    .then(character => {
      console.log("\nExample 1: Basic Promise");
      console.log(`Character name: ${character.name}`);
      console.log(`Birth year: ${character.birth_year}`);
    })
    .catch(error => {
      console.error("Example 1 failed:", error.message);
    });
  
  // Example 2: Promise chaining
  fetchCharacterWithHomeworld(1)
    .then(data => {
      console.log("\nExample 2: Promise Chaining");
      console.log(`Character: ${data.character.name}`);
      console.log(`Homeworld: ${data.homeworld.name}`);
      console.log(`Climate: ${data.homeworld.climate}`);
      console.log(`Population: ${data.homeworld.population}`);
    })
    .catch(error => {
      console.error("Example 2 failed:", error.message);
    })
    .finally(() => {
      // Finally always runs, regardless of success or failure
      console.log("\n=== Promise Demo End ===");
    });
  
  // Example 3: Handling errors
  fetchCharacter(999) // This ID doesn't exist
    .then(character => {
      console.log("\nExample 3: This shouldn't execute");
      console.log(character);
    })
    .catch(error => {
      console.log("\nExample 3: Error Handling");
      console.log(`Error caught successfully: ${error.message}`);
    });
}

// Run the demo
demoPromises();
