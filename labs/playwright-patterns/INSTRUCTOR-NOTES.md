# Playwright Patterns Lab - Instructor Notes

## Lab Overview

This lab, "Advanced API Testing Patterns with Playwright," builds upon the "playwright-core" lab by introducing more complex API testing scenarios focusing on:

1. **Authentication & Authorization Testing**
2. **File Upload/Download Testing**
3. **Response Chaining**
4. **Test Data Management with Fixtures**

## Lab Structure

- **API Extensions**: The TV Shows API has been extended with JWT authentication, role-based access control, and file upload/download capabilities.
- **Testing Patterns**: The tests demonstrate advanced patterns including authentication workflows, multi-step API operations, and test data management.

## Setup Requirements

Students will need:
- Node.js 18+
- npm or yarn
- A code editor (preferably VS Code)
- Basic understanding of REST APIs and TypeScript

## Lab Files

- `labs/playwright-patterns/`: The lab folder with starter files
- `solutions/playwright-patterns/`: The complete solution

## Key Learning Objectives

1. Implement proper authentication in API tests
2. Test file upload/download operations
3. Chain multiple API requests in a single test
4. Organize tests using fixtures and proper setup/teardown

## Teaching Tips

- Emphasize the importance of test isolation and cleanup
- Discuss real-world API testing scenarios where these patterns apply
- Point out how response chaining enables complex workflow testing
- Highlight the security implications of testing authenticated APIs

## Common Challenges

- Students may struggle with understanding JWT authentication concepts
- File upload testing can be challenging due to binary data handling
- Test cleanup and data isolation requires careful consideration
- Proper error handling in chained API requests may be confusing

## Assessment Opportunities

- Have students extend the tests with more complex scenarios
- Ask students to implement additional test fixtures
- Request improvements to the test organization structure
- Challenge students to add parameterized tests

## Time Allocation

- Introduction and setup: 20 minutes
- Authentication testing: 30 minutes
- File operations testing: 30 minutes
- Response chaining: 30 minutes
- Test organization: 20 minutes
- Wrap-up and Q&A: 20 minutes
