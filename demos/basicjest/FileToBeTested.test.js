const testFile = require('./FileToBeTested');

beforeEach(() => {
  console.log("before each test")
});

afterEach(() => {
  console.log("after each test")
});


test('Checks that the sum function returns 4 when given 2 and 2 as parameters', () => {
  expect(testFile.sum(2,2)).toBe(4);
});

test('checks that the MakeCharacter function works',() => {
  expect(testFile.MakeCharacter('alex',20)).toEqual({
    'name':'alex',
    'age':20
  });
});

test('checks that the IsEven function returns true when given 10',()=>{
  expect(testFile.IsEven(10)).toBeTruthy();
})
