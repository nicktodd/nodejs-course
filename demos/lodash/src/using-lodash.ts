  
import _ from "lodash";

// Define a User type
type User = {
  id: number;
  role: Role;
};

// Define roles as a union type and as const array
const roles = ["admin", "user"] as const; // as const means that the values can't change
//The expression typeof roles[number] is a TypeScript trick to create a union type from 
// the elements of the roles array.
// This technique automatically creates a union type from the array values, 
// keeping your types in sync with your data.
type Role = typeof roles[number]; 

// Strongly typed users
const users: User[] = [
  { id: 1, role: "admin" },
  { id: 2, role: "user" },
  { id: 3, role: "admin" }
];

// Helper type for grouped users
type GroupedUsers = Record<Role, User[]>;

// Custom groupBy that returns a strictly typed object
// the function results in the strict type checking
function groupByRole(users: User[]): GroupedUsers {
  return roles.reduce((acc, role) => {
    acc[role] = users.filter(u => u.role === role);
    return acc;
  }, {} as GroupedUsers);
}

const grouped = groupByRole(users);

console.log(grouped.admin); // OK
console.log(grouped.user);  // OK

// The following line will cause a TypeScript error:
// Property 'manager' does not exist on type 'GroupedUsers'.
console.log(grouped.manager); // TypeScript error!

