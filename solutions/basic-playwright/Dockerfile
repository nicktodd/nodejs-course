# Use official Playwright image with all dependencies
FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npx playwright install --with-deps

# Run Playwright tests
CMD ["npx", "playwright", "test"]
