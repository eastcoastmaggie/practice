console.log('hello world');

const sumRange = function(n){
    if (n <= 1){
        return 1;
    } else {
        return n + sumRange(n-1);
    }
}

const power = function(n, m){
    if (m == 0){
        return 1;
    } else {
        return n * power(n, m-1);
    }
}

const factorial = function(n){
    if (n == 1){
        return 1;
    } else {
        return n * factorial(n-1);
    }
}

const all = function(arr, func){
    if (arr.length == 1){

        return func(arr[0]);
    } else {
        return func(arr.slice(-1)) && all(arr.slice(0, arr.length -1), func);
    }
}

var allAreLessThanSeven = all([13,2,3,2], function(num){
	return num < 7;
});

const productOfArray = function(arr){
    if (arr.length == 1){

        return arr[0];if (nestedObject.magicNumber){
            return 
        }
    } else {
        return arr[arr.length -1] * productOfArray(arr.slice(0, arr.length -1));
    }
}

const contains = function(nestedObject, searchTerm){
    for(let prop in nestedObject){

        if (typeof nestedObject[prop] != 'object'){
            if(nestedObject[prop] == searchTerm){
                
                return true;
            } else {return false};
        } else { return contains(nestedObject[prop], searchTerm)}
    }
    
}

const totalIntegers = function(arr){
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

const SumSquares = function(arr){
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

const replicate = function(times, term){
    if (times <= 0){
        return [];
    }
    let arr = [term];
    return arr.concat(replicate(times-1, term));
}

const fibs = function(n){
    let sequence = [];
    for(let i = 0; i < n; i++){
        if (i == 0) sequence.push(0);
        else if (i == 1) sequence.push(1);
        else {
            sequence.push(sequence[sequence.length -1]+sequence[sequence.length-2]);
        }
    }
    return sequence;
}


const fibsRec = function(n){
    if (n == 0) return [0];
    if (n == 1) return [0, 1];
    return fibsRec(n-1).concat([fibsRec(n-1)[n-1]+fibsRec(n-1)[n-2]]);
}



const mergeSort = function(arr){
    if (arr.length <= 1) return arr;
    let sortedArray = [];
    let left = mergeSort(arr.slice(0, Math.floor(arr.length/2))); 
    let right = mergeSort(arr.slice(Math.floor(arr.length/2)));

    let leftTerm = left.shift();
    let rightTerm = right.shift();

    while(sortedArray.length < arr.length){
        if (leftTerm < rightTerm ){
            sortedArray.push(leftTerm);
            if(left.length > 0)
                leftTerm = left.shift();
            else {
                sortedArray.push(rightTerm);
                sortedArray = sortedArray.concat(right);
            }
        } else{
            sortedArray.push(rightTerm);
            if(right.length > 0)
                rightTerm = right.shift();
            else {
                sortedArray.push(leftTerm);
                sortedArray = sortedArray.concat(left);
            }
        }

    }
    return sortedArray;
}

console.log(mergeSort([2,-6,4,44,5,1,13]));