import {positiveIntegerDivisor} from './positiveIntegerDivisor'
import {arrayMatcher} from '../utils'

describe('positiveIntegerDivisor', () => {
    it('will return an array', () => {
        expect(Array.isArray(positiveIntegerDivisor(22))).toBe(true)
    });

    it('will return [0] if number is 0', () => {
        expect(positiveIntegerDivisor(0)).toEqual([0])
    });

    it('will return an array with correct results for an even number', () => {
        arrayMatcher(positiveIntegerDivisor(60), [1,2,3,4,5,6,10,12,15,20,30,60])
    });

    it('will return an array with correct results for an odd number', () => {
        arrayMatcher(positiveIntegerDivisor(21), [1,3,7,21])
    });
})

