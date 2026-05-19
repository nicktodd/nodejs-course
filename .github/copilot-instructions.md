# GitHub Copilot Instructions

## Code Style Guidelines

### Emoji Policy
- **NEVER use emojis** in any code, comments, console.log statements, or documentation
- Use plain text descriptions instead of emoji symbols
- Replace visual indicators with text equivalents:
  - Instead of ✅ use "SUCCESS:" or "VALID:"
  - Instead of ❌ use "ERROR:" or "INVALID:"
  - Instead of 🔍 use "SEARCHING:" or "FINDING:"
  - Instead of 📦 use "DATA:" or "PACKAGE:"
  - Instead of 🧪 use "TESTING:" or "TEST:"
  - Instead of 🎉 use "COMPLETED:" or "FINISHED:"

### Console Output Guidelines
- Use descriptive text labels for console output
- Format status messages with clear text prefixes
- Example: `console.log("VALIDATION SUCCESS: Data is valid")` instead of `console.log("✅ Data is valid")`

### Documentation Style
- Use standard markdown formatting without emojis
- Use bullet points, headers, and text formatting for emphasis
- Prefer clear, descriptive language over visual symbols

### TypeScript/JavaScript Conventions
- Follow strict TypeScript typing
- Use clear variable and function names
- Include JSDoc comments where appropriate
- Maintain consistent code formatting

## Project-Specific Guidelines

This is an educational Node.js course repository containing:
- Demonstration code for teaching concepts
- Lab exercises for students
- Solution implementations

All code should be:
- Professional and classroom-appropriate
- Easy to read and understand
- Free of visual distractions like emojis
- Focused on the educational content

## Examples

### Avoid (with emojis):
```typescript
console.log("🚀 Starting application");
console.log("✅ Validation passed");
console.log("❌ Error occurred");
```

### Prefer (without emojis):
```typescript
console.log("STARTING: Application initialization");
console.log("SUCCESS: Validation passed");
console.log("ERROR: An error occurred");
```
