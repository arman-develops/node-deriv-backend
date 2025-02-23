import { getLastDigits } from "./lastDigits.js";

function calculatePercentageOccurrence(lastDigitsArray) {
    // Count occurrences of each number
    var occurrenceCount = {};
    lastDigitsArray.forEach(function(number) {
        occurrenceCount[number] = (occurrenceCount[number] || 0) + 1;
    });

    // Calculate total count
    var totalCount = lastDigitsArray.length;

    // Calculate percentage occurrence for each unique number
    var percentageOccurrence = [];
    Object.keys(occurrenceCount).forEach(function(key) {
        percentageOccurrence.push((occurrenceCount[key] / totalCount) * 100);
    });
    console.log(percentageOccurrence);
    return percentageOccurrence;
}

export {calculatePercentageOccurrence};