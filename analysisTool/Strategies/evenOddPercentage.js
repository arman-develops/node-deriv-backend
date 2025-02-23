import { getLastDigits } from "./lastDigits.js";

function evenOddPercentage(priceArray) {
    let countEven = 0, countOdd = 0;
    if (!Array.isArray(priceArray)) {
        throw new Error('Input must be an array');
    }
    let lastDigits = getLastDigits(priceArray);

    lastDigits.forEach(digit => {
        if(digit % 2 == 0) {
            countEven++;
        }else {
            countOdd++;
        }
    });

    let percentageEven = (countEven/priceArray.length) * 100;
    let percentageOdd = (countOdd/priceArray.length) * 100;
    console.log(percentageEven, percentageOdd);

    //EVEN, ODD contract purchases are to be executed here

}

export {evenOddPercentage}