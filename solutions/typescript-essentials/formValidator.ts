// Form Validator System Solution

type ValidationType = 'text' | 'number' | 'email' | 'date';

interface ValidationRule {
    type: ValidationType;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    customValidator?: (value: any) => boolean;
}

interface ValidationError {
    field: string;
    message: string;
}

interface ValidationResult {
    isValid: boolean;
    errors: { [key: string]: string };
}

class FormValidator<T extends Record<string, any>> {
    private rules: Map<keyof T, ValidationRule> = new Map();

    addRule(field: keyof T, rule: ValidationRule): void {
        this.rules.set(field, rule);
    }

    validate(data: T): ValidationResult {
        const errors: { [key: string]: string } = {};

        for (const [field, rule] of this.rules) {
            const value = data[field];
            const error = this.validateField(value, rule);
            
            if (error) {
                errors[field as string] = error;
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    private validateField(value: any, rule: ValidationRule): string | null {
        // Check required
        if (rule.required && (value === undefined || value === null || value === '')) {
            return 'This field is required';
        }

        // Skip validation if value is empty and not required
        if (value === undefined || value === null || value === '') {
            return null;
        }

        // Type-specific validation
        switch (rule.type) {
            case 'text':
                return this.validateText(value, rule);
            case 'number':
                return this.validateNumber(value, rule);
            case 'email':
                return this.validateEmail(value);
            case 'date':
                return this.validateDate(value);
            default:
                return 'Unknown validation type';
        }
    }

    private validateText(value: string, rule: ValidationRule): string | null {
        if (typeof value !== 'string') {
            return 'Value must be a string';
        }

        if (rule.minLength && value.length < rule.minLength) {
            return `Must be at least ${rule.minLength} characters`;
        }

        if (rule.maxLength && value.length > rule.maxLength) {
            return `Must be no more than ${rule.maxLength} characters`;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
            return 'Invalid format';
        }

        if (rule.customValidator && !rule.customValidator(value)) {
            return 'Failed custom validation';
        }

        return null;
    }

    private validateNumber(value: number, rule: ValidationRule): string | null {
        if (typeof value !== 'number' || isNaN(value)) {
            return 'Value must be a number';
        }

        if (rule.min !== undefined && value < rule.min) {
            return `Must be at least ${rule.min}`;
        }

        if (rule.max !== undefined && value > rule.max) {
            return `Must be no more than ${rule.max}`;
        }

        if (rule.customValidator && !rule.customValidator(value)) {
            return 'Failed custom validation';
        }

        return null;
    }

    private validateEmail(value: string): string | null {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : 'Invalid email format';
    }

    private validateDate(value: any): string | null {
        const date = new Date(value);
        return isNaN(date.getTime()) ? 'Invalid date' : null;
    }
}

// Test the implementation
interface UserForm {
    username: string;
    email: string;
    age: number;
    birthDate: string;
    password: string;
}

try {
    const validator = new FormValidator<UserForm>();

    // Add validation rules
    validator.addRule('username', {
        type: 'text',
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_]+$/
    });

    validator.addRule('email', {
        type: 'email',
        required: true
    });

    validator.addRule('age', {
        type: 'number',
        required: true,
        min: 18,
        max: 100
    });

    validator.addRule('birthDate', {
        type: 'date',
        required: true
    });

    validator.addRule('password', {
        type: 'text',
        required: true,
        minLength: 8,
        customValidator: (value: string) => 
            /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value)
    });

    // Test valid data
    console.log('Testing valid data:');
    const validResult = validator.validate({
        username: 'john_doe',
        email: 'john@example.com',
        age: 25,
        birthDate: '1998-01-01',
        password: 'SecurePass123'
    });
    console.log(validResult);

    // Test invalid data
    console.log('\nTesting invalid data:');
    const invalidResult = validator.validate({
        username: 'j',
        email: 'invalid-email',
        age: 15,
        birthDate: 'not-a-date',
        password: 'weak'
    });
    console.log(invalidResult);

} catch (error) {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    }
}
