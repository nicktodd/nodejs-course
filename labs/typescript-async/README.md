# TypeScript Asynchronous Programming Lab

## Overview

This lab focuses on working with asynchronous programming in TypeScript. You will learn how to use promises with `.then()/.catch()` and the newer `async/await` syntax. You'll also learn how to execute multiple promises in parallel.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Familiarize yourself with the Star Wars API (SWAPI) documentation:
   - [SWAPI Documentation](https://swapi.dev/documentation)
   - Base URL: https://swapi.dev/api/

## Exercise 1: Working with Promises

In this exercise, you will create functions that use Promise syntax with `.then()` and `.catch()` to fetch data from the Star Wars API.

Create a file named `promises.ts` with the following requirements:

1. Create a function called `fetchPlanet` that takes a `planetId` parameter (number) and returns a Promise that:
   - Makes a GET request to `https://swapi.dev/api/planets/{planetId}/`
   - Returns the planet data if successful
   - Handles errors appropriately

2. Create a function called `fetchCharacter` that takes a `characterId` parameter (number) and returns a Promise that:
   - Makes a GET request to `https://swapi.dev/api/people/{characterId}/`
   - Returns the character data if successful
   - Handles errors appropriately

3. Create a function called `fetchCharacterHomeworld` that:
   - Takes a `characterId` parameter (number)
   - First fetches the character using your `fetchCharacter` function
   - Then fetches the character's homeworld using the URL from the character data
   - Returns an object with both character and homeworld information
   - Uses promise chaining with `.then()`

4. In a `main` function, call your `fetchCharacterHomeworld` function with different character IDs (e.g., 1 for Luke Skywalker) and log the results

5. Handle errors throughout your promise chain

## Exercise 2: Using Async/Await

In this exercise, you will reimplement the same functionality using the `async/await` syntax.

Create a file named `async-await.ts` with the following requirements:

1. Create an async function called `fetchPlanetAsync` that:
   - Takes a `planetId` parameter (number)
   - Uses `try/catch` for error handling
   - Makes a GET request to `https://swapi.dev/api/planets/{planetId}/`
   - Returns the planet data if successful

2. Create an async function called `fetchCharacterAsync` that:
   - Takes a `characterId` parameter (number)
   - Uses `try/catch` for error handling
   - Makes a GET request to `https://swapi.dev/api/people/{characterId}/`
   - Returns the character data if successful

3. Create an async function called `fetchCharacterHomeworldAsync` that:
   - Takes a `characterId` parameter (number)
   - First awaits the character using your `fetchCharacterAsync` function
   - Then awaits the character's homeworld using the URL from the character data
   - Returns an object with both character and homeworld information

4. Create an async `mainAsync` function that:
   - Calls your `fetchCharacterHomeworldAsync` function with different character IDs
   - Logs the results
   - Handles errors with try/catch

## Exercise 3: Parallel Promise Execution

In this exercise, you will learn how to execute multiple promises in parallel using `Promise.all()`.

Create a file named `parallel.ts` with the following requirements:

1. Create a function called `fetchFilm` that:
   - Takes a `filmId` parameter (number)
   - Makes a GET request to `https://swapi.dev/api/films/{filmId}/`
   - Returns the film data

2. Create an async function called `fetchFilmWithCharacters` that:
   - Takes a `filmId` parameter (number)
   - Fetches the film data
   - Then uses `Promise.all()` to fetch data for all characters that appear in the film
   - Returns an object with the film data and an array of character data

3. Create an async function called `fetchMultiplePlanets` that:
   - Takes an array of planet IDs (numbers)
   - Uses `Promise.all()` to fetch all planets in parallel
   - Returns an array of planet data

4. Create an async `mainParallel` function that:
   - Calls `fetchMultiplePlanets` with IDs [1, 2, 3, 4, 5]
   - Calls `fetchFilmWithCharacters` with a film ID (e.g., 1 for "A New Hope")
   - Logs the results
   - Handles errors with try/catch

## Bonus Challenge: Race Conditions

Create a file named `race.ts` that demonstrates the use of `Promise.race()`:

1. Create a function that simulates a timeout after a specified number of milliseconds
2. Create a function that fetches data from the Star Wars API
3. Use `Promise.race()` to either get the data or timeout after 2 seconds
4. Test with both fast and slow network conditions

## Running Your Code

You can run your code using the following commands:

```bash
npm run start:promises        # Run Exercise 1
npm run start:async-await     # Run Exercise 2
npm run start:parallel        # Run Exercise 3
```

## Notes

- Make sure to handle errors properly in all exercises
- Use TypeScript interfaces to define the shapes of your data
- Consider using axios for HTTP requests
- Remember to use proper TypeScript types throughout your code
