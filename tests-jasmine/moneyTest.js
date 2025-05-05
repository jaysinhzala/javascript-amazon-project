//This file is for test different test cases for Money.js function
import { formatCurrency } from "../scripts/utils/money.js";
/** 
 * describe function is inbuid function in jasmine to create test suit.
 * it takes two argument.
 * 1.name of test suit 
 * 2. function which contains test
 * 'it()' is also inbuid function to create test
 * it takes two argument.
 * 1.name of test case 
 * 2. function which contains test
 * */ 
describe('Test suit: formatCurrency', () => {
    it('convert cents into dollers', () => {
        //expect compares two values
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Works with 0', () => {
        //expect compares two values
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Rounds up for nearest cents', () => {
        //expect compares two values
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});