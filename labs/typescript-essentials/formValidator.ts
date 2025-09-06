// Form Validator System
// Implement your types and classes here

type ValidationType = 'text' | 'number' | 'email' | 'date';

interface ValidationRule {
    // Define validation rule properties
}

interface ValidationError {
    // Define validation error properties
}

interface ValidationResult {
    isValid: boolean;
    errors: { [key: string]: string };
}

class FormValidator<T extends Record<string, any>> {
    private rules: Map<keyof T, ValidationRule> = new Map();

    addRule(field: keyof T, rule: ValidationRule): void {
        // Implement rule addition
    }

    validate(data: T): ValidationResult {
        // Implement validation
        return {
            isValid: false,
            errors: {}
        };
    }

    private validateField(value: any, rule: ValidationRule): string | null {
        // Implement field validation
        return null;
    }

    private validateEmail(email: string): boolean {
        // Implement email validation
        return false;
    }

    private validateNumber(value: number, min?: number, max?: number): boolean {
        // Implement number validation
        return false;
    }

    private validateDate(date: Date): boolean {
        // Implement date validation
        return false;
    }
}

// Test your implementation
interface UserForm {
    email: string;
    age: number;
    birthDate: Date;
}

const validator = new FormValidator<UserForm>();

// Add your test cases here
