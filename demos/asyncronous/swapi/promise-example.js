// Import axios for HTTP requests
const axios = require('axios');

/**
 * PROMISE EXAMPLE WITH AXIOS
 * 
 * This example demonstrates the Promise pattern for handling asynchronous operations.
 * Promises provide a cleaner way to handle async operations compared to callbacks,
 * avoiding "callback hell" and providing better error handling through .catch().
 * 
 * A Promise represents a value that may be available now, in the future, or never.
 * It has three states: pending, fulfilled (resolved), or rejected.
 * 
 * Axios returns Promises natively, making it perfect for demonstrating Promise patterns.
 */

/**
 * Function to fetch planet data using Promise pattern with axios
 * @param {number} planetId - The ID of the planet to fetch (1-60)
 * @returns {Promise} - Promise that resolves with planet data or rejects with error
 */
function fetchPlanetWithPromise(planetId) {
    const url = `https://swapi.py4e.com/api/planets/${planetId}/`;
    
    // Axios.get() returns a Promise directly
    return axios.get(url)
        .then(function(response) {
            // Axios automatically parses JSON and puts it in response.data
            return response.data;
        })
        .catch(function(error) {
            // Enhanced error handling with axios error structure
            let errorMessage = 'Unknown error occurred';
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                errorMessage = `HTTP Error: ${error.response.status} - ${error.response.statusText}`;
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = 'Network error: No response received from server';
            } else {
                // Something happened in setting up the request that triggered an Error
                errorMessage = `Request setup error: ${error.message}`;
            }
            
            // Re-throw the error with our custom message
            throw new Error(errorMessage);
        });
}

/**
 * Helper function to display planet information
 * @param {object} planet - Planet data object from the API
 */
function displayPlanetInfo(planet) {
    console.log('=== PLANET INFORMATION ===');
    console.log(`Name: ${planet.name}`);
    console.log(`Climate: ${planet.climate}`);
    console.log(`Terrain: ${planet.terrain}`);
    console.log(`Population: ${planet.population}`);
    console.log(`Diameter: ${planet.diameter} km`);
    console.log(`Gravity: ${planet.gravity}`);
    console.log('===========================');
}

// Example 1: Basic Promise usage with .then() and .catch()
console.log('Fetching planet data using PROMISE pattern...');
console.log('Loading...');

fetchPlanetWithPromise(1)
    .then(function(planetData) {
        // This function runs when the promise is resolved (successful)
        console.log('Planet data fetched successfully!');
        displayPlanetInfo(planetData);
    })
    .catch(function(error) {
        // This function runs when the promise is rejected (error occurred)
        console.error('Error fetching planet data:', error.message);
    });

// Example 2: Promise chaining - fetching multiple planets sequentially
console.log('\n--- Promise Chaining Example ---');
console.log('Fetching multiple planets sequentially with promises...');

fetchPlanetWithPromise(1)
    .then(function(planet1) {
        console.log(`First planet: ${planet1.name}`);
        // Return another promise to chain them
        return fetchPlanetWithPromise(2);
    })
    .then(function(planet2) {
        console.log(`Second planet: ${planet2.name}`);
        // Return another promise to continue the chain
        return fetchPlanetWithPromise(3);
    })
    .then(function(planet3) {
        console.log(`Third planet: ${planet3.name}`);
        console.log('All planets fetched with promise chaining!');
    })
    .catch(function(error) {
        // This catch will handle errors from any promise in the chain
        console.error('Error in promise chain:', error.message);
    });

// Example 3: Promise.all() - fetching multiple planets in parallel
console.log('\n--- Promise.all() Example ---');
console.log('Fetching multiple planets in parallel...');

// Create an array of promises
const planetPromises = [
    fetchPlanetWithPromise(1),
    fetchPlanetWithPromise(2),
    fetchPlanetWithPromise(3)
];

// Promise.all() waits for all promises to resolve or any to reject
Promise.all(planetPromises)
    .then(function(planets) {
        // All promises resolved successfully
        console.log('All planets fetched in parallel!');
        planets.forEach(function(planet, index) {
            console.log(`Planet ${index + 1}: ${planet.name}`);
        });
    })
    .catch(function(error) {
        // If any promise rejects, this catch will be called
        console.error('Error fetching planets in parallel:', error.message);
    });

// Example 4: Promise.race() - get the first response
console.log('\n--- Promise.race() Example ---');
console.log('Racing multiple planet requests...');

const racingPromises = [
    fetchPlanetWithPromise(4),
    fetchPlanetWithPromise(5),
    fetchPlanetWithPromise(6)
];

// Promise.race() resolves with the first promise that settles (resolves or rejects)
Promise.race(racingPromises)
    .then(function(firstPlanet) {
        console.log(` First planet to load: ${firstPlanet.name}`);
    })
    .catch(function(error) {
        console.error('First promise to settle was a rejection:', error.message);
    });

/**
 * BENEFITS OF USING AXIOS WITH PROMISES:
 * 
 * 1. Native Promise support - Axios returns Promises out of the box
 * 2. Automatic JSON parsing - response.data contains the parsed JSON
 * 3. Structured error handling - Clear error.response, error.request, error.message
 * 4. Request/Response interceptors - Global request/response modification
 * 5. Concurrent requests - Works perfectly with Promise.all(), Promise.race()
 * 6. Request cancellation - Built-in support for canceling requests
 * 7. Automatic request/response transformation - Handle different data types
 * 8. Base URL and instance creation - Reusable configuration
 * 
 * Axios is designed with Promises in mind, making it the perfect choice
 * for modern asynchronous JavaScript patterns.
 */
