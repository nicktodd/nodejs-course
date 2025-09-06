// Variable declarations and scope demonstration

// Using var (function-scoped)
var oldWay = "I'm using var";
console.log('var variable:', oldWay);

// Using let (block-scoped)
let modernWay = "I'm using let";
console.log('let variable:', modernWay);

// Using const (block-scoped and immutable binding)
const neverChanges = "I can't be reassigned";
console.log('const variable:', neverChanges);

// Demonstrating block scope
{
    let blockScoped = "I'm only available in this block";
    var notBlockScoped = "I'm available outside the block";
    console.log('Inside block:', blockScoped);
}

// This will work
console.log('Outside block:', notBlockScoped);

// This would cause an error - blockScoped is not defined here
// console.log(blockScoped);

// Demonstrating variable reassignment
modernWay = "I can be changed";
console.log('Changed let variable:', modernWay);

// This would cause an error - can't reassign const
// neverChanges = "This will fail";

// However, const objects can have their properties modified
const person = { name: "John" };
person.name = "Jane"; // This works
console.log('Modified const object:', person);
