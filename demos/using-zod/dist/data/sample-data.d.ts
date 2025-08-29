/**
 * Sample data for testing Zod schemas
 * This file contains various test cases including valid and invalid data
 */
export declare const validUsers: {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}[];
export declare const invalidUsers: ({
    description: string;
    data: {
        id: number;
        name: string;
        email: string;
        age: number;
        isActive: boolean;
    };
} | {
    description: string;
    data: {
        id: number;
        name: string;
        email: string;
        age: number;
        isActive: string;
    };
} | {
    description: string;
    data: {
        id: number;
        name: string;
        email?: undefined;
        age?: undefined;
        isActive?: undefined;
    };
})[];
export declare const validProducts: ({
    id: string;
    name: string;
    price: number;
    category: string;
    tags: string[];
    inStock: boolean;
    metadata: {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
    };
} | {
    id: number;
    name: string;
    price: number;
    category: string;
    tags: string[];
    inStock: boolean;
    metadata?: undefined;
})[];
export declare const registrationFormData: {
    description: string;
    data: {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        agreedToTerms: boolean;
    };
}[];
export declare const apiRequests: {
    createUser: ({
        description: string;
        data: {
            name: string;
            email: string;
            age: number;
        };
    } | {
        description: string;
        data: {
            name: string;
            email: string;
            age?: undefined;
        };
    })[];
    searchProducts: ({
        description: string;
        query: {
            category: string;
            minPrice: string;
            maxPrice: string;
            page: string;
            limit: string;
            sortBy: string;
            sortOrder: string;
        };
    } | {
        description: string;
        query: {
            category: string;
            minPrice: string;
            maxPrice: string;
            page: string;
            limit?: undefined;
            sortBy?: undefined;
            sortOrder?: undefined;
        };
    } | {
        description: string;
        query: {
            category: string;
            page: string;
            minPrice?: undefined;
            maxPrice?: undefined;
            limit?: undefined;
            sortBy?: undefined;
            sortOrder?: undefined;
        };
    })[];
};
export declare const edgeCases: ({
    description: string;
    data: {
        id: null;
        name: null;
        email: null;
        age: null;
        isActive: null;
        extraField1?: undefined;
        extraField2?: undefined;
        extraField3?: undefined;
    };
} | {
    description: string;
    data: {
        id: undefined;
        name: undefined;
        email: undefined;
        age: undefined;
        isActive: undefined;
        extraField1?: undefined;
        extraField2?: undefined;
        extraField3?: undefined;
    };
} | {
    description: string;
    data: {
        id: string;
        name: number;
        email: string[];
        age: string;
        isActive: string;
        extraField1?: undefined;
        extraField2?: undefined;
        extraField3?: undefined;
    };
} | {
    description: string;
    data: {
        id: number;
        name: string;
        email: string;
        age: number;
        isActive: boolean;
        extraField1: string;
        extraField2: {
            nested: string;
        };
        extraField3: number[];
    };
})[];
//# sourceMappingURL=sample-data.d.ts.map