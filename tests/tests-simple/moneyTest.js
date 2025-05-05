//This file is for test different test cases for Money.js function
import { formatCurrency } from "../../scripts/utils/money.js";

console.log('Test Suits : FormatCurrency');
//Below line is name of test cases
console.log('Convert Cents into Doller');
if (formatCurrency(2095) === '20.95') {
    console.log('Passed');
}
else {
    console.log('Failed');
}

console.log('Works with 0');
if (formatCurrency(0) === '0.00') {
    console.log('Passed');
}
else {
    console.log('Failed');
}

console.log('Rounds up for nearest cents');
if (formatCurrency(2000.5) === '20.01') {
    console.log('Passed');
}
else {
    console.log('Failed');
}