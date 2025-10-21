# TypeScript and Vitest Lab - Exercise Created

## Summary

I've created a complete TDD exercise for TypeScript and Vitest with the following structure:

## Lab Files (labs/typescript-vitest/)

### Files Created:
1. **package.json** - Starter with empty dependencies
2. **README.md** - Comprehensive instructions including:
   - Setup instructions (npm install, config files)
   - TDD methodology explanation (Red-Green-Refactor)
   - Exercise requirements
   - Step-by-step guide for first test
   - Tips and troubleshooting
   
3. **tests/example.test.ts** - Sample test showing Vitest syntax (1+1=2 example)
4. **.gitignore** - Standard Node.js ignore file

### Lab Structure:
```
labs/typescript-vitest/
├── tests/
│   └── example.test.ts     # Sample test (students can delete)
├── package.json            # Starter with empty deps
├── README.md              # Full instructions
└── .gitignore
```

### What Students Need to Do:

1. **Setup Phase:**
   - Install dependencies: `npm install --save-dev typescript vitest @vitest/ui`
   - Create `tsconfig.json`
   - Create `vitest.config.ts`
   - Create `src/` folder

2. **Implementation Phase (TDD):**
   - Create `Time` interface
   - Write test for midnight → Make it pass
   - Write test for midday → Make it pass
   - Continue with more time formats if time permits

3. **Expected Deliverables:**
   - Minimum: Tests and implementation for midnight and midday
   - Stretch: Additional time formats (AM/PM, minutes past, etc.)

## Solution Files (solutions/typescript-vitest/)

### Files Created:
1. **package.json** - Complete with all dependencies
2. **tsconfig.json** - TypeScript configuration
3. **vitest.config.ts** - Vitest configuration
4. **src/TimeAsText.ts** - Implementation (midnight and midday only)
5. **tests/TimeAsText.test.ts** - Tests for midnight and midday
6. **README.md** - Solution documentation with extension ideas
7. **.gitignore** - Standard ignore file

### Solution Structure:
```
solutions/typescript-vitest/
├── src/
│   └── TimeAsText.ts       # Implementation
├── tests/
│   └── TimeAsText.test.ts  # Test suite
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── README.md
└── .gitignore
```

### Solution Implementation:
- ✅ Handles midnight (00:00:00) → "midnight"
- ✅ Handles midday (12:00:00) → "midday"
- ✅ Returns "time not implemented" for other times
- ✅ Includes TODO comments for students to extend

## Key Features

### Lab README Includes:
- ✅ Clear setup instructions
- ✅ TDD methodology explanation
- ✅ Red-Green-Refactor cycle explanation
- ✅ Step-by-step first test guide
- ✅ Common Vitest assertions reference
- ✅ Troubleshooting section
- ✅ Success criteria
- ✅ Stretch goals

### Teaching Approach:
- **Intermediate level** - Assumes TypeScript knowledge
- **TDD focused** - Emphasizes test-first development
- **Incremental** - Start simple (midnight/midday), expand later
- **Practical** - Real-world time conversion problem
- **Self-guided** - General guidance, not hand-holding

## Running the Lab

### For Students:
```powershell
cd labs/typescript-vitest
npm install --save-dev typescript vitest @vitest/ui
# Follow README instructions
npm test
```

### For Instructors (Solution):
```powershell
cd solutions/typescript-vitest
npm install
npm test
```

## Exercise Progression

Students follow this TDD cycle:

1. **Test: Midnight**
   - Write test → RED
   - Implement return "midnight" → GREEN
   - Refactor if needed

2. **Test: Midday**
   - Write test → RED  
   - Add conditional → GREEN
   - Refactor if needed

3. **Additional Tests** (time permitting)
   - Minutes past midnight
   - Minutes past midday
   - AM times
   - PM times

## Files to Review

- `labs/typescript-vitest/README.md` - Main instructions
- `labs/typescript-vitest/tests/example.test.ts` - Sample test
- `solutions/typescript-vitest/README.md` - Solution guide
- `solutions/typescript-vitest/src/TimeAsText.ts` - Implementation
- `solutions/typescript-vitest/tests/TimeAsText.test.ts` - Tests

## Notes

- The solution is intentionally minimal (only midnight/midday)
- Encourages students to extend the implementation
- Provides clear extension points with TODO comments
- README includes guidance for adding more time formats
- Sample test can be deleted once students understand the syntax
