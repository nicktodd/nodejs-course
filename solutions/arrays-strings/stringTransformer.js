// String Transformer Solution

class StringTransformer {
    constructor(text) {
        this.text = text;
    }

    toCamelCase() {
        return this.text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
    }

    toSnakeCase() {
        return this.text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '_')
            .replace(/(^_|_$)/g, '');
    }

    toKebabCase() {
        return this.text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    toAcronym() {
        return this.text
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }

    reverseWords() {
        return this.text.replace(/\b\w+\b/g, word => 
            word.split('').reverse().join('')
        );
    }

    encode(shift = 1) {
        return this.text.replace(/[a-zA-Z]/g, char => {
            const code = char.charCodeAt(0);
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 65 : 97;
            return String.fromCharCode(
                ((code - base + shift) % 26) + base
            );
        });
    }

    decode(shift = 1) {
        return this.encode(26 - (shift % 26));
    }

    // Helper method to split into words
    splitWords() {
        return this.text.split(/\s+/);
    }
}

// Test the string transformer
const text = "hello world example";
const transformer = new StringTransformer(text);

console.log('String Transformations');
console.log('---------------------');
console.log('Original:', text);

console.log('\nTransformations:');
console.log('- Camel Case:', transformer.toCamelCase());
console.log('- Snake Case:', transformer.toSnakeCase());
console.log('- Kebab Case:', transformer.toKebabCase());
console.log('- Acronym:', transformer.toAcronym());
console.log('- Reversed Words:', transformer.reverseWords());

const encoded = transformer.encode();
console.log('- Encoded:', encoded);
console.log('- Decoded:', new StringTransformer(encoded).decode());

// Test with more complex input
const complexText = "The Quick Brown Fox!";
const complexTransformer = new StringTransformer(complexText);
console.log('\nComplex Text Transformations:');
console.log('Original:', complexText);
console.log('- Camel Case:', complexTransformer.toCamelCase());
console.log('- Snake Case:', complexTransformer.toSnakeCase());
console.log('- Kebab Case:', complexTransformer.toKebabCase());
