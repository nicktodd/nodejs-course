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
  const url = `https://swapi.dev/api/planets/${planetId}/`;
  
  return axios.get(url)
    .then(response => {
      console.log(`Successfully fetched planet ${planetId}`);
      return response.data;
    })
    .catch(error => {
      console.error(`Error fetching planet ${planetId}:`, error.message);
      throw error;
    });
}

/**
 * Fetches character data from the Star Wars API
 * @param characterId The ID of the character to fetch
 * @returns A promise resolving to character data
 */
function fetchCharacter(characterId: number): Promise<Character> {
  const url = `https://swapi.dev/api/people/${characterId}/`;
  
  return axios.get(url)
    .then(response => {
      console.log(`Successfully fetched character ${characterId}`);
      return response.data;
    })
    .catch(error => {
      console.error(`Error fetching character ${characterId}:`, error.message);
      throw error;
    });
}

/**
 * Fetches a character and their homeworld
 * @param characterId The ID of the character
 * @returns A promise resolving to character and homeworld data
 */
function fetchCharacterHomeworld(characterId: number): Promise<CharacterHomeworld> {
  return fetchCharacter(characterId)
    .then(character => {
      // Extract the planet ID from the homeworld URL
      const homeworldUrl = character.homeworld;
      const homeworldId = parseInt(homeworldUrl.split('/').filter(Boolean).pop() || '0');
      
      return fetchPlanet(homeworldId)
        .then(planet => {
          return {
            character,
            homeworld: planet
          };
        });
    });
}

/**
 * Main function to demonstrate promise usage
 */
function main(): void {
  console.log("Fetching data using Promise syntax (.then/.catch)...");
  
  // Fetch Luke Skywalker (ID: 1) and his homeworld
  fetchCharacterHomeworld(1)
    .then(data => {
      console.log('\nCharacter and Homeworld Information:');
      console.log(`Name: ${data.character.name}`);
      console.log(`Birth Year: ${data.character.birth_year}`);
      console.log(`Homeworld: ${data.homeworld.name}`);
      console.log(`Homeworld Climate: ${data.homeworld.climate}`);
      console.log(`Homeworld Population: ${data.homeworld.population}`);
    })
    .catch(error => {
      console.error('An error occurred in the main function:', error.message);
    })
    .finally(() => {
      console.log('\nPromise demonstration completed.');
    });
  
  // Fetch Leia Organa (ID: 5) and her homeworld
  fetchCharacterHomeworld(5)
    .then(data => {
      console.log('\nCharacter and Homeworld Information:');
      console.log(`Name: ${data.character.name}`);
      console.log(`Birth Year: ${data.character.birth_year}`);
      console.log(`Homeworld: ${data.homeworld.name}`);
      console.log(`Homeworld Climate: ${data.homeworld.climate}`);
      console.log(`Homeworld Population: ${data.homeworld.population}`);
    })
    .catch(error => {
      console.error('An error occurred in the main function:', error.message);
    });
  
  // Deliberately cause an error with an invalid ID
  fetchCharacterHomeworld(999)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Expected error with invalid ID:', error.message);
    });
}

// Run the main function
main();
