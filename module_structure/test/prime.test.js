const isPrime = require('prime-number-check');

test ('test that 3 is prime', () => {
   expect(isPrime(3)).toBe(true);
})
