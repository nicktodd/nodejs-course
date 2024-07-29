import  isPrime from 'prime-number-check';

export const checkNumber = (value) => {
  return  isPrime(value) ? "The number is prime" : "The number is not prime";
}
