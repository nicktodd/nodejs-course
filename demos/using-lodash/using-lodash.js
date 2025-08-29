"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
// Strongly typed users
var users = [
    { id: 1, role: "admin" },
    { id: 2, role: "user" },
    { id: 3, role: "admin" }
];
// Type-safe groupBy
var grouped = lodash_1.default.groupBy(users, "role");
// grouped is Record<string, User[]>
console.log(grouped.admin);
// Inferred as User[]
// Property 'manager' does not exist on type 'Record<string, User[]>'
// TypeScript catches this error at compile-time!
console.log(grouped.manager);
