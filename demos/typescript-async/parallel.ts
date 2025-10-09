/**
 * PARALLEL PROMISES EXAMPLE - TypeScript
 * 
 * This file demonstrates executing multiple promises in parallel.
 */
import axios from 'axios';

// Define TypeScript interfaces for API responses
interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  url: string;
}

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  birth_year: string;
  url: string;
}

interface Film {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  characters: string[];
  planets: string[];
  url: string;
}

// Function to fetch a planet by ID
async function fetchPlanet(id: number): Promise<Planet> {
  try {
    const response = await axios.get(`https://swapi.dev/api/planets/${id}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch planet ${id}: ${error.message}`);
  }
}

// Function to fetch a film by ID
async function fetchFilm(id: number): Promise<Film> {
  try {
    const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch film ${id}: ${error.message}`);
  }
}

// Function to fetch a character by URL
async function fetchCharacterByUrl(url: string): Promise<Character> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch character from ${url}: ${error.message}`);
  }
}

// Demo 1: Fetch multiple planets in parallel with Promise.all()
async function demoFetchMultiplePlanets(): Promise<void> {
  console.log("\n=== Demo 1: Fetching Multiple Planets in Parallel ===");
  console.log("Creating promises for planets 1, 2, 3, 4, and 5...");
  
  try {
    // Create an array of promises
    const planetPromises: Promise<Planet>[] = [1, 2, 3, 4, 5].map(id => fetchPlanet(id));
    
    console.log(`Waiting for all ${planetPromises.length} planet promises to resolve...`);
    
    // Execute all promises in parallel and wait for all to complete
    const planets = await Promise.all(planetPromises);
    
    console.log(`Successfully fetched ${planets.length} planets:`);
    planets.forEach(planet => {
      console.log(`- ${planet.name} (Climate: ${planet.climate}, Population: ${planet.population})`);
    });
    
  } catch (error: any) {
    console.error("Error fetching planets:", error.message);
  }
}

// Demo 2: Fetch a film and all its characters in parallel
async function demoFetchFilmWithCharacters(): Promise<void> {
  console.log("\n=== Demo 2: Fetching Film with All Characters ===");
  
  try {
    // First get the film data
    console.log("Fetching film data for 'A New Hope'...");
    const film = await fetchFilm(1); // 1 = A New Hope
    console.log(`Film: ${film.title} (${film.release_date})`);
    console.log(`Director: ${film.director}`);
    console.log(`Number of characters: ${film.characters.length}`);
    
    // Then fetch all characters in parallel
    console.log(`\nFetching all ${film.characters.length} characters in parallel...`);
    const characterPromises = film.characters.map(url => fetchCharacterByUrl(url));
    
    // Wait for all character promises to complete
    const characters = await Promise.all(characterPromises);
    
    console.log(`Successfully fetched ${characters.length} characters:`);
    characters.slice(0, 5).forEach(character => { // Just display first 5
      console.log(`- ${character.name}`);
    });
    
    if (characters.length > 5) {
      console.log(`- ... and ${characters.length - 5} more`);
    }
    
  } catch (error: any) {
    console.error("Error fetching film with characters:", error.message);
  }
}

// Demo 3: Promise.allSettled - handle mixture of resolved and rejected promises
async function demoPromiseAllSettled(): Promise<void> {
  console.log("\n=== Demo 3: Using Promise.allSettled ===");
  
  // Create a mix of promises that will succeed and fail
  const mixedPromises = [
    fetchPlanet(1),             // Should succeed
    fetchPlanet(999),           // Should fail
    fetchFilm(1),               // Should succeed
    Promise.reject('Deliberate failure') // Will definitely fail
  ];
  
  console.log(`Created ${mixedPromises.length} promises (mix of success and failure)...`);
  
  try {
    // Using Promise.allSettled to handle a mixture of resolved and rejected promises
    const results = await Promise.allSettled(mixedPromises);
    
    console.log(`\nResults (${results.length} total):`);
    
    // Count fulfilled and rejected promises
    const fulfilled = results.filter(result => result.status === 'fulfilled').length;
    const rejected = results.filter(result => result.status === 'rejected').length;
    
    console.log(`- ${fulfilled} promises fulfilled`);
    console.log(`- ${rejected} promises rejected`);
    
    // Process each result
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const value: any = result.value;
        const name = value.name || value.title || 'Unknown';
        console.log(`[${index}] ✅ Fulfilled: ${name}`);
      } else {
        console.log(`[${index}] ❌ Rejected: ${result.reason}`);
      }
    });
  } catch (error: any) {
    console.error("This shouldn't happen with Promise.allSettled", error.message);
  }
}

// Main function to run all demos
async function demoParallel(): Promise<void> {
  console.log("=== Parallel Promises Demo Start ===");
  
  // Run all the demos in sequence
  await demoFetchMultiplePlanets();
  await demoFetchFilmWithCharacters();
  await demoPromiseAllSettled();
  
  console.log("\n=== Parallel Promises Demo End ===");
}

// Run the demo
demoParallel();
