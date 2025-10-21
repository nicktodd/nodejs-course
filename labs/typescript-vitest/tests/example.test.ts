import { describe, it, expect } from 'vitest';

/**
 * This is a sample test to help you understand Vitest syntax.
 * You can delete this file once you're comfortable with the testing structure.
 * 
 * Create your actual tests in TimeAsText.test.ts
 */

describe('Sample Test Suite', () => {
  it('should perform basic arithmetic', () => {
    // Arrange
    const a = 1;
    const b = 1;
    
    // Act
    const result = a + b;
    
    // Assert
    expect(result).toBe(2);
  });

  it('should check string equality', () => {
    const greeting = 'Hello';
    expect(greeting).toBe('Hello');
  });

  it('should verify array contents', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toContain(3);
    expect(numbers).toHaveLength(5);
  });
});
