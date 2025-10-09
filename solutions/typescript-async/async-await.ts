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
 * Fetches planet data from the Star Wars API using async/await
 * @param planetId The ID of the planet to fetch
 * @returns The planet data
 */
async function fetchPlanetAsync(planetId: number): Promise<Planet> {
  const url = `https://swapi.dev/api/planets/${planetId}/`;
  
  try {
    const response = await axios.get(url);
    console.log(`Successfully fetched planet ${planetId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching planet ${planetId}:`, error.message);
    throw error;
  }
}

/**
 * Fetches character data from the Star Wars API using async/await
 * @param characterId The ID of the character to fetch
 * @returns The character data
 */
async function fetchCharacterAsync(characterId: number): Promise<Character> {
  const url = `https://swapi.dev/api/people/${characterId}/`;
  
  try {
    const response = await axios.get(url);
    console.log(`Successfully fetched character ${characterId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching character ${characterId}:`, error.message);
    throw error;
  }
}

/**
 * Fetches a character and their homeworld using async/await
 * @param characterId The ID of the character
 * @returns Character and homeworld data
 */
async function fetchCharacterHomeworldAsync(characterId: number): Promise<CharacterHomeworld> {
  try {
    // First fetch the character
    const character = await fetchCharacterAsync(characterId);
    
    // Extract the planet ID from the homeworld URL
    const homeworldUrl = character.homeworld;
    const homeworldId = parseInt(homeworldUrl.split('/').filter(Boolean).pop() || '0');
    
    // Then fetch the homeworld
    const homeworld = await fetchPlanetAsync(homeworldId);
    
    // Return both pieces of data
    return {
      character,
      homeworld
    };
  } catch (error: any) {
    console.error(`Error in fetchCharacterHomeworldAsync:`, error.message);
    throw error;
  }
}

/**
 * Main async function to demonstrate async/await usage
 */
async function mainAsync(): Promise<void> {
  console.log("Fetching data using async/await syntax...");
  
  try {
    // Fetch Luke Skywalker (ID: 1) and his homeworld
    const lukeData = await fetchCharacterHomeworldAsync(1);
    console.log('\nCharacter and Homeworld Information:');
    console.log(`Name: ${lukeData.character.name}`);
    console.log(`Birth Year: ${lukeData.character.birth_year}`);
    console.log(`Homeworld: ${lukeData.homeworld.name}`);
    console.log(`Homeworld Climate: ${lukeData.homeworld.climate}`);
    console.log(`Homeworld Population: ${lukeData.homeworld.population}`);
    
    // Fetch Leia Organa (ID: 5) and her homeworld
    const leiaData = await fetchCharacterHomeworldAsync(5);
    console.log('\nCharacter and Homeworld Information:');
    console.log(`Name: ${leiaData.character.name}`);
    console.log(`Birth Year: ${leiaData.character.birth_year}`);
    console.log(`Homeworld: ${leiaData.homeworld.name}`);
    console.log(`Homeworld Climate: ${leiaData.homeworld.climate}`);
    console.log(`Homeworld Population: ${leiaData.homeworld.population}`);
    
    try {
      // Deliberately cause an error with an invalid ID
      const invalidData = await fetchCharacterHomeworldAsync(999);
      console.log(invalidData);
    } catch (error: any) {
      console.error('Expected error with invalid ID:', error.message);
    }
    
  } catch (error: any) {
    console.error('An error occurred in the main async function:', error.message);
  } finally {
    console.log('\nAsync/await demonstration completed.');
  }
}

// Run the main async function
mainAsync();
