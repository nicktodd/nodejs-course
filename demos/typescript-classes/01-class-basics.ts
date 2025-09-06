// TypeScript Classes Demonstration

// Basic class definition with access modifiers
class BankAccount {
    private static bankName: string = "TypeScript National Bank";
    protected balance: number;
    private readonly accountNumber: string;
    private _frozen: boolean = false;

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
        this.accountNumber = Math.random().toString(36).substr(2, 9);
    }

    // Static method
    static getBankName(): string {
        return BankAccount.bankName;
    }

    // Getter
    get accountStatus(): string {
        return this._frozen ? "Frozen" : "Active";
    }

    // Setter
    set frozen(value: boolean) {
        if (this._frozen && !value) {
            throw new Error("Cannot unfreeze account without authorization");
        }
        this._frozen = value;
    }

    // Public method
    deposit(amount: number): void {
        if (this._frozen) {
            throw new Error("Cannot deposit to frozen account");
        }
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.balance += amount;
    }

    // Protected method
    protected validateWithdrawal(amount: number): boolean {
        return amount > 0 && amount <= this.balance && !this._frozen;
    }

    // Public method using protected method
    withdraw(amount: number): void {
        if (!this.validateWithdrawal(amount)) {
            throw new Error("Invalid withdrawal");
        }
        this.balance -= amount;
    }

    // Public method
    getBalance(): number {
        return this.balance;
    }
}

// Class inheritance
class SavingsAccount extends BankAccount {
    private interestRate: number;

    constructor(initialBalance: number, interestRate: number) {
        super(initialBalance);
        this.interestRate = interestRate;
    }

    // Method override with super call
    deposit(amount: number): void {
        super.deposit(amount);
        this.addInterest();
    }

    // Private helper method
    private addInterest(): void {
        const interest = this.balance * (this.interestRate / 100);
        super.deposit(interest);
    }

    // Protected method override
    protected validateWithdrawal(amount: number): boolean {
        // Require minimum balance of 100
        return super.validateWithdrawal(amount) && (this.balance - amount) >= 100;
    }
}

// Interface implementation
interface AccountManager {
    freezeAccount(account: BankAccount): void;
    unfreezeAccount(account: BankAccount): void;
}

// Class implementing interface
class BankManager implements AccountManager {
    freezeAccount(account: BankAccount): void {
        account.frozen = true;
    }

    unfreezeAccount(account: BankAccount): void {
        // This will throw an error as expected
        try {
            account.frozen = false;
        } catch (error) {
            console.log("Authorization required to unfreeze account");
        }
    }
}

// Demo
function runDemo() {
    console.log("TypeScript Classes Demo\n");

    // Static members
    console.log(`Bank Name: ${BankAccount.getBankName()}`);

    // Basic account operations
    const account = new BankAccount(1000);
    console.log(`Initial balance: $${account.getBalance()}`);
    
    account.deposit(500);
    console.log(`After deposit: $${account.getBalance()}`);
    
    account.withdraw(200);
    console.log(`After withdrawal: $${account.getBalance()}`);
    
    // Savings account operations
    const savings = new SavingsAccount(2000, 5);
    console.log("\nSavings Account:");
    console.log(`Initial balance: $${savings.getBalance()}`);
    
    savings.deposit(1000);
    console.log(`After deposit with interest: $${savings.getBalance()}`);
    
    try {
        savings.withdraw(2800); // Should fail due to minimum balance
        console.log("Withdrawal succeeded"); // Won't execute
    } catch (error) {
        console.log("Withdrawal failed: Minimum balance requirement");
    }

    // Account manager operations
    console.log("\nAccount Management:");
    const manager = new BankManager();
    
    console.log(`Account status: ${account.accountStatus}`);
    manager.freezeAccount(account);
    console.log(`Account status after freeze: ${account.accountStatus}`);
    
    try {
        account.deposit(100);
        console.log("Deposit succeeded"); // Won't execute
    } catch (error) {
        console.log("Deposit failed: Account is frozen");
    }

    manager.unfreezeAccount(account); // Will show authorization message
}

runDemo();
