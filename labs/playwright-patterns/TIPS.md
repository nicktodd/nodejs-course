## Tips and Common Issues

### Testing Best Practices

1. **Authentication Handling**
   - Store tokens in variables rather than repeating login requests
   - Set up authentication once in `beforeAll` hooks when possible
   - Test both valid and invalid authentication scenarios

2. **File Upload Testing**
   - You might not have a real image file in the fixtures directory initially
   - The tests are designed to create a placeholder file if needed
   - For a more realistic test, place a small JPG image in `tests/fixtures/test-image.jpg`

3. **Debugging Failed Tests**
   - Use `npm run test:debug` to run tests in debug mode
   - Check the HTTP status codes and response bodies
   - Look for authentication issues (expired or missing tokens)
   - Verify that your test is sending the correct headers and data

### Common Issues and Solutions

1. **"Error: listen EADDRINUSE: address already in use :::3000"**
   - The server is already running on port 3000
   - Stop any existing server processes before starting a new one
   - Or change the port in `src/server.ts` if needed

2. **Authentication Failures**
   - Ensure you're adding the token with the correct format: `Bearer ${token}`
   - Check that the token is being retrieved correctly in the `beforeAll` hook
   - Tokens expire after 1 hour - regenerate if needed

3. **File Upload Errors**
   - Ensure the `uploads` directory exists
   - Check that your test is correctly forming the multipart request
   - Verify the file path is correct in your test

4. **TypeScript Configuration Issues**
   - If you encounter TypeScript errors, check the imports in your test files
   - Use `import * as fs from 'fs'` instead of `import fs from 'fs'`
   - Make sure `esModuleInterop` is set to `true` in tsconfig.json
