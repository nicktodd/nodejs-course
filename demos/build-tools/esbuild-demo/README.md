# esbuild Demo

This is a minimal demo project using esbuild.

## What it does
- Bundles `index.js` into `dist/bundle.js` using esbuild.
- The HTML file loads the bundle and logs a message to the console.

## How to run
1. Install esbuild:
   ```sh
   npm install esbuild --save-dev
   ```
2. Build the project:
   ```sh
   node esbuild.config.js
   ```
3. Open `index.html` in your browser and check the console for the message.
