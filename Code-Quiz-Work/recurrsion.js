// My answers to https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion
//

// Question 1
// Write a function called sumRange. It will take a number and return the sum of all numbers from 1 up to the number passed in.
function sumRange(n){
    if (n <= 1){
        return 1;
    } else {
        return n + sumRange(n-1);
    }
}

// Question 2
// Write a function called power which takes in a base and an exponent. If the exponent is 0, return 1.
function power(n, m){
    if (m == 0){
        return 1;
    } else {
        return n * power(n, m-1);
    }
}

// Question 3 
// Write a function that returns the factorial of a number.
function factorialfunction(n){
    if (n == 1){
        return 1;
    } else {
        return n * factorial(n-1);
    }
}

// Question 4
// Write a function called all which accepts an array and a callback and returns true if 
// every value in the array returns true when passed as parameter to the callback function
function all(arr, func){
    if (arr.length == 1){

        return func(arr[0]);
    } else {
        return func(arr.slice(-1)) && all(arr.slice(0, arr.length -1), func);
    }
}

var allAreLessThanSeven = all([13,2,3,2], function(num){
	return num < 7;
});

// Question 5
// Write a function called productOfArray which takes in an array of numbers and returns the product of them all
function productOfArray(arr){
    if (arr.length == 1){

        return arr[0];if (nestedObject.magicNumber){
            return 
        }
    } else {
        return arr[arr.length -1] * productOfArray(arr.slice(0, arr.length -1));
    }
}

// Question 6
// Write a function called contains that searches for a value in a nested object. It returns true if the object contains that value.
function contains(nestedObject, searchTerm){
    for(let prop in nestedObject){

        if (typeof nestedObject[prop] != 'object'){
            if(nestedObject[prop] == searchTerm){
                
                return true;
            } else {return false};
        } else { return contains(nestedObject[prop], searchTerm)}
    }
    
}

// Question 7
// Given a multi-dimensional integer array, return the total number of integers stored inside this array
function totalIntegers(arr){
    if (arr.length === 0 ){
        return 0;
    }
    let numInts = 0;
    let first = arr.shift();
    if(Array.isArray(first)){
        numInts += totalIntegers(first);
    }
    if( Number.isInteger(first)){
        numInts++;
    }
    return numInts + totalIntegers(arr);
}

// Question 8
// Write a function that sums squares of numbers in list that may contain more lists
function SumSquares(arr){
    if (arr.length === 0){
        return 0;
    } 
    let sum = 0;
    let first = arr.slice()
    if (Array.isArray(first)){
        sum += SumSquares(first);
    }
    if (Number.isInteger(first)){
        sum += (first * first);
    }
    return sum += SumSquares(arr);
}

// Question 9
// The function should return an array containing repetitions of the number argument. 
// For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.
function replicate(times, term){
    if (times <= 0){
        return [];
    }
    let arr = [term];
    return arr.concat(replicate(times-1, term));
}
