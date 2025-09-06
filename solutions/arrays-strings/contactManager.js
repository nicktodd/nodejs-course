// Contact List Manager Solution

class Contact {
    constructor(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    toString() {
        return `${this.name} (${this.email}, ${this.phone})`;
    }

    toDetailedString() {
        return `${this.name}\n   Email: ${this.email}\n   Phone: ${this.phone}`;
    }
}

class ContactManager {
    constructor() {
        this.contacts = [];
    }

    addContact(name, email, phone) {
        // Validate inputs
        if (!this.validateEmail(email)) {
            throw new Error('Invalid email format');
        }
        if (!this.validatePhone(phone)) {
            throw new Error('Invalid phone format');
        }
        
        // Check for duplicate email
        if (this.contacts.some(contact => contact.email.toLowerCase() === email.toLowerCase())) {
            throw new Error('Email already exists');
        }

        const contact = new Contact(name, email, phone);
        this.contacts.push(contact);
        return contact;
    }

    removeContact(email) {
        const index = this.contacts.findIndex(
            contact => contact.email.toLowerCase() === email.toLowerCase()
        );
        
        if (index === -1) {
            throw new Error('Contact not found');
        }

        return this.contacts.splice(index, 1)[0];
    }

    searchContacts(name) {
        const searchTerm = name.toLowerCase();
        return this.contacts.filter(
            contact => contact.name.toLowerCase().includes(searchTerm)
        );
    }

    displayContacts() {
        const sortedContacts = [...this.contacts].sort((a, b) => 
            a.name.localeCompare(b.name)
        );

        return sortedContacts.map((contact, index) => 
            `${index + 1}. ${contact.toDetailedString()}`
        ).join('\n\n');
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    }
}

// Test the contact manager
const manager = new ContactManager();

console.log('Contact List Manager');
console.log('-------------------');

try {
    // Add contacts
    const john = manager.addContact('John Doe', 'john@email.com', '123-456-7890');
    console.log('Added:', john.toString());

    const jane = manager.addContact('Jane Smith', 'jane@email.com', '098-765-4321');
    console.log('Added:', jane.toString());

    // Display sorted contacts
    console.log('\nContacts (sorted by name):');
    console.log(manager.displayContacts());

    // Search for contacts
    console.log('\nSearch results for "jo":');
    const searchResults = manager.searchContacts('jo');
    searchResults.forEach(contact => console.log(`- ${contact.toString()}`));

    // Remove a contact
    const removed = manager.removeContact('john@email.com');
    console.log('\nRemoved contact:', removed.email);

} catch (error) {
    console.error('Error:', error.message);
}
