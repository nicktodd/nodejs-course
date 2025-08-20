// Import axios for HTTP requests
const axios = require('axios');

/**
 * ASYNC/AWAIT EXAMPLE WITH AXIOS
 * 
 * This example demonstrates the async/await syntax for handling asynchronous operations.
 * Async/await is syntactic sugar built on top of Promises, making asynchronous code
 * look and behave more like synchronous code, which is easier to read and debug.
 * 
 * - 'async' keyword: Makes a function return a Promise
 * - 'await' keyword: Pauses execution until a Promise resolves/rejects
 * - Can only use 'await' inside 'async' functions
 * 
 * Axios works perfectly with async/await since it returns Promises natively.
 */

/**
 * Function to fetch planet data using axios (returns a Promise)
 * @param {number} planetId - The ID of the planet to fetch (1-60)
 * @returns {Promise} - Promise that resolves with planet data
 */
async function fetchPlanetData(planetId) {
    try {
        const url = `https://swapi.py4e.com/api/planets/${planetId}/`;
        
        // Make the HTTP request using axios
        const response = await axios.get(url);
        
        // Axios automatically parses JSON and puts it in response.data
        return response.data;
        
    } catch (error) {
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
    }
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

/**
 * Example 1: Basic async/await usage
 * The 'async' keyword makes this function return a Promise
 */
async function fetchSinglePlanet() {
    try {
        console.log('Fetching planet data using ASYNC/AWAIT pattern...');
        console.log('Loading...');
        
        // The 'await' keyword pauses execution until the Promise resolves
        const planetData = await fetchPlanetData(1);
        
        // This line won't execute until the above Promise resolves
        console.log('✅ Planet data fetched successfully!');
        displayPlanetInfo(planetData);
        
    } catch (error) {
        // If the Promise rejects, the error is caught here
        console.error('❌ Error fetching planet data:', error.message);
    }
}

/**
 * Example 2: Sequential async operations (like Promise chaining)
 * Each await waits for the previous operation to complete
 */
async function fetchMultiplePlanetsSequentially() {
    try {
        console.log('\n--- Sequential Async/Await Example ---');
        console.log('Fetching multiple planets sequentially...');
        
        // Each await waits for the previous one to complete
        const planet1 = await fetchPlanetData(1);
        console.log(`First planet: ${planet1.name}`);
        
        const planet2 = await fetchPlanetData(2);
        console.log(`Second planet: ${planet2.name}`);
        
        const planet3 = await fetchPlanetData(3);
        console.log(`Third planet: ${planet3.name}`);
        
        console.log('All planets fetched sequentially with async/await!');
        
    } catch (error) {
        console.error('❌ Error in sequential fetch:', error.message);
    }
}

/**
 * Example 3: Parallel async operations (like Promise.all)
 * All requests start simultaneously, then we await all results
 */
async function fetchMultiplePlanetsInParallel() {
    try {
        console.log('\n--- Parallel Async/Await Example ---');
        console.log('Fetching multiple planets in parallel...');
        
        // Start all requests simultaneously (don't await immediately)
        const planet1Promise = fetchPlanetData(4);
        const planet2Promise = fetchPlanetData(5);
        const planet3Promise = fetchPlanetData(6);
        
        // Now await all of them together using Promise.all
        const [planet1, planet2, planet3] = await Promise.all([
            planet1Promise,
            planet2Promise,
            planet3Promise
        ]);
        
        console.log('✅ All planets fetched in parallel!');
        console.log(`Planet 1: ${planet1.name}`);
        console.log(`Planet 2: ${planet2.name}`);
        console.log(`Planet 3: ${planet3.name}`);
        
    } catch (error) {
        console.error('❌ Error in parallel fetch:', error.message);
    }
}

/**
 * Example 4: Error handling with multiple try-catch blocks
 * Demonstrates how to handle errors for individual operations
 */
async function fetchPlanetsWithIndividualErrorHandling() {
    console.log('\n--- Individual Error Handling Example ---');
    
    const results = [];
    
    // Handle each request individually
    for (let i = 7; i <= 9; i++) {
        try {
            const planet = await fetchPlanetData(i);
            results.push({ success: true, planet: planet });
            console.log(`✅ Fetched planet ${i}: ${planet.name}`);
        } catch (error) {
            results.push({ success: false, error: error.message });
            console.log(`❌ Failed to fetch planet ${i}: ${error.message}`);
        }
    }
    
    console.log(`Completed: ${results.filter(r => r.success).length} successful, ${results.filter(r => !r.success).length} failed`);
}

/**
 * Example 5: Using async/await in a loop with delay
 * Demonstrates how to add delays between requests
 */
async function fetchPlanetsWithDelay() {
    console.log('\n--- Async/Await with Delay Example ---');
    
    // Helper function to create a delay
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    try {
        for (let i = 10; i <= 12; i++) {
            console.log(`Fetching planet ${i}...`);
            
            const planet = await fetchPlanetData(i);
            console.log(`✅ Received: ${planet.name}`);
            
            // Wait 1 second before next request
            if (i < 12) {
                console.log('Waiting 1 second...');
                await delay(1000);
            }
        }
        
        console.log('All planets fetched with delays!');
        
    } catch (error) {
        console.error('❌ Error in delayed fetch:', error.message);
    }
}

// Execute all examples
// Note: We need to call async functions to run them

// Run examples in sequence to avoid overwhelming the API
async function runAllExamples() {
    await fetchSinglePlanet();
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
    
    await fetchMultiplePlanetsSequentially();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await fetchMultiplePlanetsInParallel();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await fetchPlanetsWithIndividualErrorHandling();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await fetchPlanetsWithDelay();
}

// Start the examples
console.log('Starting Async/Await examples...');
runAllExamples().then(() => {
    console.log('\n🎉 All async/await examples completed!');
}).catch((error) => {
    console.error('❌ Error running examples:', error.message);
});

/**
 * BENEFITS OF USING AXIOS WITH ASYNC/AWAIT:
 * 
 * 1. Clean, readable syntax - async/await makes asynchronous code look synchronous
 * 2. Native Promise support - Axios works seamlessly with async/await
 * 3. Automatic JSON parsing - No manual JSON.parse() needed
 * 4. Superior error handling - Structured error objects with detailed information
 * 5. Request/Response interceptors - Global middleware for requests and responses
 * 6. Built-in request cancellation - Cancel requests when needed
 * 7. Configurable instances - Create reusable axios instances with default config
 * 8. Automatic request/response transformation - Handle various data formats
 * 9. Wide ecosystem support - Many plugins and extensions available
 * 10. TypeScript support - Excellent TypeScript definitions
 * 
 * Axios + async/await = The most modern and readable way to handle HTTP requests
 * in JavaScript. This combination provides the best developer experience for
 * asynchronous operations.
 */
