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

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface FilmWithCharacters {
  film: Film;
  characters: Character[];
}

/**
 * Fetches film data from the Star Wars API
 * @param filmId The ID of the film to fetch
 * @returns A promise resolving to film data
 */
async function fetchFilm(filmId: number): Promise<Film> {
  const url = `https://swapi.dev/api/films/${filmId}/`;
  
  try {
    const response = await axios.get(url);
    console.log(`Successfully fetched film ${filmId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching film ${filmId}:`, error.message);
    throw error;
  }
}

/**
 * Fetches character data using a full URL
 * @param url The URL of the character to fetch
 * @returns A promise resolving to character data
 */
async function fetchCharacterByUrl(url: string): Promise<Character> {
  try {
    const response = await axios.get(url);
    console.log(`Successfully fetched character from ${url}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching character from ${url}:`, error.message);
    throw error;
  }
}

/**
 * Fetches a film and all its characters in parallel
 * @param filmId The ID of the film
 * @returns The film data and array of character data
 */
async function fetchFilmWithCharacters(filmId: number): Promise<FilmWithCharacters> {
  try {
    // First fetch the film
    const film = await fetchFilm(filmId);
    
    // Then fetch all characters in parallel
    const characterPromises = film.characters.map(characterUrl => 
      fetchCharacterByUrl(characterUrl)
    );
    
    // Wait for all character promises to resolve
    const characters = await Promise.all(characterPromises);
    
    return {
      film,
      characters
    };
  } catch (error: any) {
    console.error(`Error in fetchFilmWithCharacters:`, error.message);
    throw error;
  }
}

/**
 * Fetches multiple planets in parallel
 * @param planetIds Array of planet IDs to fetch
 * @returns Array of planet data
 */
async function fetchMultiplePlanets(planetIds: number[]): Promise<Planet[]> {
  try {
    // Create an array of promises for each planet
    const planetPromises = planetIds.map(id => {
      const url = `https://swapi.dev/api/planets/${id}/`;
      return axios.get(url).then(response => {
        console.log(`Successfully fetched planet ${id}`);
        return response.data;
      });
    });
    
    // Wait for all promises to resolve in parallel
    return await Promise.all(planetPromises);
  } catch (error: any) {
    console.error('Error fetching multiple planets:', error.message);
    throw error;
  }
}

/**
 * Main function to demonstrate parallel promise execution
 */
async function mainParallel(): Promise<void> {
  console.log("Fetching data in parallel...");
  
  try {
    // Fetch multiple planets in parallel
    console.log('\n--- Fetching Multiple Planets in Parallel ---');
    const planets = await fetchMultiplePlanets([1, 2, 3, 4, 5]);
    console.log(`\nFetched ${planets.length} planets:`);
    planets.forEach(planet => {
      console.log(`- ${planet.name} (Climate: ${planet.climate}, Population: ${planet.population})`);
    });
    
    // Fetch film with all characters
    console.log('\n--- Fetching Film with All Characters ---');
    const filmData = await fetchFilmWithCharacters(1); // Star Wars: A New Hope
    
    console.log(`\nFilm: ${filmData.film.title}`);
    console.log(`Director: ${filmData.film.director}`);
    console.log(`Release Date: ${filmData.film.release_date}`);
    console.log(`\nCharacters (${filmData.characters.length}):`);
    
    filmData.characters.forEach((character, index) => {
      if (index < 5) { // Just show first 5 characters
        console.log(`- ${character.name}`);
      }
    });
    
    if (filmData.characters.length > 5) {
      console.log(`- ... and ${filmData.characters.length - 5} more`);
    }
    
  } catch (error: any) {
    console.error('An error occurred in the main parallel function:', error.message);
  } finally {
    console.log('\nParallel promise execution demonstration completed.');
  }
}

// Run the main function
mainParallel();
