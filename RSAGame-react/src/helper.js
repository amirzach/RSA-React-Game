// Helper functions

// Function to check if a number is prime
// Miller-Rabin primality test for faster prime checking
export function isPrime(number) {
  let k = 5; // Number of iterations for Miller-Rabin primality test

  if (number <= 1) return false;
  if (number <= 3) return true;
  if (number % 2 === 0) return false;

  let d = number - 1;
  let s = 0;

  while (d % 2 === 0) {
    d = Math.floor(d / 2);
    s++;
  }

  // Miller-Rabin primality test
  for (let i = 0; i < k; i++) {
    const a = 2 + Math.floor(Math.random() * (number - 3));
    let x = modExp(a, d, number);

    if (x === 1 || x === number - 1) continue;

    for (let j = 0; j < s - 1; j++) {
      x = modExp(x, 2, number);
      if (x === 1) return false;
      if (x === number - 1) break;
    }

    if (x !== number - 1) return false;
  }

  return true;
}

// Function to calculate modular exponentiation
export function modExp(base, exp, mod) {
  if (mod === 1) return 0;
  let result = 1;
  base = base % mod;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }

    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }

  return result;
}

// Function to generate possible p and q values
export function generatePandQValues(lowerBound, upperBound) {
  let primeVals = [] 
  let nonPrimeVals = [];
  let selectedPrimes = [];
  let selectedNonPrimes = [];
  let generatedPValues = [];
  let generatedQValues = [];

  // Generate possible p values
  for (let i = lowerBound; i <= upperBound; i++) {
    if (isPrime(i)) {
      primeVals.push(i);
    } else {
      nonPrimeVals.push(i);
    }
  }

  // Randomly select two prime numbers and three non-prime numbers for p values
  selectedPrimes = primeVals.sort(() => 0.5 - Math.random()).slice(0, 2);
  selectedNonPrimes = nonPrimeVals.sort(() => 0.5 - Math.random()).slice(0, 3);
  generatedPValues = [...selectedPrimes, ...selectedNonPrimes];
  generatedPValues.sort(() => 0.5 - Math.random()); // Shuffle p values

  // Reset prime and non-prime arrays for q values
  primeVals = [];
  nonPrimeVals = [];

  // Generate possible q values
  for (let i = lowerBound; i <= upperBound; i++) {
    if (isPrime(i)) {
      primeVals.push(i);
    } else {
      nonPrimeVals.push(i);
    }
  }

  // Randomly select two prime numbers and three non-prime numbers for q values
  selectedPrimes = primeVals.sort(() => 0.5 - Math.random()).slice(0, 2);
  selectedNonPrimes = nonPrimeVals.sort(() => 0.5 - Math.random()).slice(0, 3);
  generatedQValues = [...selectedPrimes, ...selectedNonPrimes];
  generatedQValues.sort(() => 0.5 - Math.random()); // Shuffle q values

  return {generatedPValues, generatedQValues};
}

// Function to calculate modular inverse using Extended Euclidean Algorithm
function modInverse(a, m) {
  let [oldR, r] = [a, m];
  let [oldS, s] = [1, 0];
  let [oldT, t] = [0, 1];

  while (r !== 0) {
    const quotient = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
    [oldT, t] = [t, oldT - quotient * t];
  }

  if (oldR !== 1) return null; // No inverse exists if a and m are not coprime
  return (oldS + m) % m; // Ensure the result is positive
}

// Function to generate public (e) and private key (d)
export function generateKeyPair(p, q) {
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const validEs = [];
  const keyMap = new Map();

  // Check e = 2 separately (only if it is coprime with phi)
  if (isPrime(2) && phi % 2 !== 0) {
    validEs.push(2);
    const d = modInverse(2, phi);
    if (d !== null) keyMap.set(2, d);
  }

  // Check odd numbers starting from 3 to skip even non-prime candidates
  for (let e = 3; e < phi; e += 2) {
    if (isPrime(e) && phi % e !== 0) {
      validEs.push(e);
      const d = modInverse(e, phi);
      if (d !== null) keyMap.set(e, d);
    }
  }

  return {n, phi, validEs, keyMap};
}