
function getLastDigits(priceArray) {
    let lastDigitsArray = [];
    priceArray.forEach(price => {
        const stringPrice = price.toString();
        const lastDigit = parseInt(stringPrice.charAt(stringPrice.length - 1));
        lastDigitsArray.push(lastDigit);

    });
    return lastDigitsArray;
}

export {getLastDigits};