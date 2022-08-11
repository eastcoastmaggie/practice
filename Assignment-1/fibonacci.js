// 

/* Using iteration, write a function fibs which takes a number and returns an array 
 * containing that many numbers from the fibonacci sequence. Using an example input 
 * of 8, this method should return the array [0, 1, 1, 2, 3, 5, 8, 13].
 */

function fibs(n){
    let sequence = [];
    for(let i = 0; i < n; i++){
        if (i == 0) sequence.push(0);
        else if (i == 1) sequence.push(1);
        else {
            sequence.push(sequence[sequence.length-1] + sequence[sequence.length-2]);
        }
    }
    return sequence;
}

/* Now write another method fibsRec which solves the same problem recursively. This 
 * can be done in just a couple of lines (or 1 if you’re crazy, but don’t consider 
 * either of these lengths a requirement… just get it done).
 */

function fibsRec(n){
    if (n == 0) return [0];
    if (n == 1) return [0, 1];
    return fibsRec(n-1).concat([fibsRec(n-1)[n-1] + fibsRec(n-1)[n-2]]);
}