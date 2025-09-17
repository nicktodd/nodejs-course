// Import axios for HTTP requests
const axios = require('axios');

/**
 * CALLBACK EXAMPLE WITH AXIOS
 * 
 * This example demonstrates the traditional callback pattern for handling asynchronous operations.
 * Callbacks are functions passed as arguments to other functions, executed when an operation completes.
 * 
 * We're using axios, a popular HTTP client library that simplifies making HTTP requests
 * and provides better error handling and response parsing compared to XMLHttpRequest.
 */

/**
 * Function to fetch planet data using callback pattern with axios
 * @param {number} planetId - The ID of the planet to fetch (1-60)
 * @param {function} callback - Callback function with signature (error, data)
 */
function fetchPlanetWithCallback(planetId, callback) {
    // Construct the API URL
    const url = `https://swapi.py4e.com/api/planets/${planetId}/`;
    
    // Make GET request using axios
    axios.get(url)
        .then(function(response) {
            // Axios automatically parses JSON responses
            // The actual data is in response.data
            const planetData = response.data;
            
            // Call the callback with null error and the data
            callback(null, planetData);
        })
        .catch(function(error) {
            // Handle any errors that occurred during the request
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
            
            // Call the callback with the error
            callback(new Error(errorMessage), null);
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

// Example usage: Fetch data for planet Tatooine (ID: 1)
console.log('Fetching planet data using CALLBACK pattern...');
console.log('Loading...');

fetchPlanetWithCallback(1, function(error, planetData) {
    if (error) {
        // Handle error case
        console.error('Error fetching planet data:', error.message);
    } else {
        // Handle success case
        console.log('Planet data fetched successfully!');
        displayPlanetInfo(planetData);
    }
});

// Example of callback hell - fetching multiple planets sequentially
console.log('\n--- Demonstrating Callback Hell ---');
console.log('Fetching multiple planets sequentially...');

fetchPlanetWithCallback(1, function(error1, planet1) {
    if (error1) {
        console.error('Error fetching planet 1:', error1.message);
        return;
    }
    
    console.log(`First planet: ${planet1.name}`);
    
    // Nested callback - this creates "callback hell"
    fetchPlanetWithCallback(2, function(error2, planet2) {
        if (error2) {
            console.error('Error fetching planet 2:', error2.message);
            return;
        }
        
        console.log(`Second planet: ${planet2.name}`);
        
        // Even more nesting - the pyramid of doom!
        fetchPlanetWithCallback(3, function(error3, planet3) {
            if (error3) {
                console.error('Error fetching planet 3:', error3.message);
                return;
            }
            
            console.log(`Third planet: ${planet3.name}`);
            console.log('All planets fetched with callbacks!');
        });
    });
});

/**
 * BENEFITS OF USING AXIOS WITH CALLBACKS:
 * 
 * 1. Automatic JSON parsing - No need to manually parse response.responseText
 * 2. Better error handling - Structured error objects with response/request/message
 * 3. Request/Response interceptors - Can modify requests/responses globally
 * 4. Automatic request body serialization - Handles objects, FormData, etc.
 * 5. Wide browser support - Works in both Node.js and browsers
 * 6. Request timeout support - Built-in timeout handling
 * 7. Request and response transformation - Automatic data transformation
 * 8. Concurrent request helpers - Built-in support for multiple requests
 * 
 * Even though we're using callbacks here for demonstration, axios naturally
 * returns Promises, making it more suitable for Promise-based patterns.
 */
