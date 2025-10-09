import axios from 'axios';

// Define interfaces for API responses
interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

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

interface CharacterHomeworld {
  character: Character;
  homeworld: Planet;
}

/**
 * Fetches planet data from the Star Wars API
 * @param planetId The ID of the planet to fetch
 * @returns A promise resolving to planet data
 */
function fetchPlanet(planetId: number): Promise<Planet> {
  // TODO: Implement this function using axios and Promise syntax
  // - Make a GET request to https://swapi.dev/api/planets/{planetId}/
  // - Return the planet data if successful
  // - Handle errors appropriately
  
  return Promise.reject(new Error('Not implemented'));
}

/**
 * Fetches character data from the Star Wars API
 * @param characterId The ID of the character to fetch
 * @returns A promise resolving to character data
 */
function fetchCharacter(characterId: number): Promise<Character> {
  // TODO: Implement this function using axios and Promise syntax
  // - Make a GET request to https://swapi.dev/api/people/{characterId}/
  // - Return the character data if successful
  // - Handle errors appropriately
  
  return Promise.reject(new Error('Not implemented'));
}

/**
 * Fetches a character and their homeworld
 * @param characterId The ID of the character
 * @returns A promise resolving to character and homeworld data
 */
function fetchCharacterHomeworld(characterId: number): Promise<CharacterHomeworld> {
  // TODO: Implement this function using Promise chaining (.then)
  // - First fetch the character using your fetchCharacter function
  // - Then fetch the character's homeworld using the URL from the character data
  // - Return an object with both character and homeworld information
  
  return Promise.reject(new Error('Not implemented'));
}

/**
 * Main function to demonstrate promise usage
 */
function main(): void {
  console.log("Fetching data using Promise syntax (.then/.catch)...");
  
  // TODO: Call your fetchCharacterHomeworld function with different character IDs
  // (e.g., 1 for Luke Skywalker) and log the results
  
  // TODO: Handle errors throughout your promise chain
}

// Run the main function
main();
