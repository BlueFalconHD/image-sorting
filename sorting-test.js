




function testSortingAlgorithm(algorithm, array, condition) {
    let data = [...array];
    let previousState, iterations = 0;
    do {
        previousState = [...data];
        data = algos[algorithm](data, condition);
        console.log(`step #${iterations}: ${data}`)
        iterations++;
    } while (!data._sf.sorted);

    return data;
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}

// Example condition function for ascending order
function ascendingCondition(a, b) {
    return a < b;
}

let arrayToSort = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log(`Final QuickSort: ${testSortingAlgorithm("quicksort", arrayToSort, ascendingCondition)}`);
arrayToSort = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log(`Final bubblesort: ${testSortingAlgorithm("bubblesort", arrayToSort, ascendingCondition)}`);