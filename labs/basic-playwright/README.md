# Playwright API Testing Lab (TypeScript)

In this exercise, you will set up Playwright in your Node.js project and use it to write automated API tests in TypeScript against the public SWAPI (Star Wars API) at https://swapi.py4e.com/documentation#base.

## Objectives
- Install and configure Playwright for API testing with TypeScript
- Write simple API tests using Playwright Test in TypeScript
- Validate responses from the SWAPI endpoints

## Prerequisites
- Node.js installed
- Internet connection

## Step 1: Project Setup

1. Create a new folder for this lab (if not already present):
   ```sh
   mkdir basic-playwright
   cd basic-playwright
   ```
2. Initialize a new Node.js project:
   ```sh
   npm init -y
   ```
3. Install Playwright Test and TypeScript:
   ```sh
   npm install --save-dev @playwright/test typescript ts-node
   ```
4. Initialize Playwright Test (optional):
   ```sh
   npx playwright install
   ```
5. Create a basic `tsconfig.json` in the lab folder:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true,
       "outDir": "dist"
     },
     "include": ["*.ts"]
   }
   ```

## Step 2: Create Playwright Test File

1. Create a new file called `swapi.spec.ts` in the `basic-playwright` folder.
2. Write tests to:
   - Fetch a list of people
   - Fetch a specific person by ID
   - Validate the response structure and status code

## Step 3: Example Test Cases

- Test GET /api/people
- Test GET /api/people/1
- Check for expected properties in the response

## Step 4: Run the Tests

1. Add a test script to your `package.json`:
   ```json
   "scripts": {
     "test": "npx playwright test"
   }
   ```
2. Run the tests:
   ```sh
   npm test
   ```

## Step 5: Run Tests Using VS Code Extension

You can run Playwright tests directly from Visual Studio Code using the official Playwright Test extension.

1. Open VS Code and go to the Extensions view (`Ctrl+Shift+X`).
2. Search for `Playwright Test` and install the extension by Microsoft.
3. Open your test file (e.g., `swapi.spec.ts`).
4. You should see Run/Debug code lenses above each test. Click `Run` to execute the test and view results in the Test Explorer panel.

This extension provides a convenient UI for running, debugging, and viewing Playwright test results.

---

## Optional: Run Tests Using Docker

You can run your Playwright tests in a containerized environment using Docker. This is useful for consistent CI/CD pipelines or testing on different platforms.

1. Create a `Dockerfile` in your lab folder with the following content:
   ```Dockerfile
   FROM mcr.microsoft.com/playwright:v1.43.0-jammy
   WORKDIR /app
   COPY . .
   RUN npm install --legacy-peer-deps
   RUN npx playwright install --with-deps
   CMD ["npx", "playwright", "test"]
   ```
2. Build the Docker image:
   ```powershell
   docker build -t playwright-lab .
   ```
3. Run the tests in a container:
   ```powershell
   docker run --rm playwright-lab
   ```

This will execute your Playwright tests in a clean, isolated environment.

## Bonus Challenge
- Add tests for other SWAPI endpoints (e.g., planets, starships)
- Validate error handling for invalid endpoints
- Use Playwright's test hooks for setup/teardown
