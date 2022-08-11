// Recursion practice 
/**Build a function mergeSort that takes in an array and returns a sorted array, using
 * a recursive merge sort methodology.
 */

function mergeSort(arr){
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