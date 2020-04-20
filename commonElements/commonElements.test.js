import {commonElements} from './commonElements'
import {arrayMatcher} from '../utils'

describe('commonElements', () => {
    it('will return an array', () => {
        expect(Array.isArray(commonElements([1,2,3,4]))).toBe(true)
    });

    it('will contain the most common element', () => {
        arrayMatcher(commonElements([1,2,3,4,4,4]), [4])
    });

    it('will contain more than one common element if present', () => {
        arrayMatcher(commonElements([1,2,3,4,4,2]), [4,2])
    });

    it('will contain all elements if there are no common elements are present', () => {
        arrayMatcher(commonElements([1,2,3,4]), [1,2,3,4])
    });
})

