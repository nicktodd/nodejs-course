"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
// Strongly typed users
const users = [
    { id: 1, role: "admin" },
    { id: 2, role: "user" },
    { id: 3, role: "admin" }
];
// Type-safe groupBy
const grouped = lodash_1.default.groupBy(users, "role");
// grouped is Record<string, User[]>
console.log(grouped.admin);
// Inferred as User[]
// Property 'manager' does not exist on type 'Record<string, User[]>'
// TypeScript catches this error at compile-time!
console.log(grouped.manager);
