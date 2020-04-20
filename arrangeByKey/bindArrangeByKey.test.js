import {bindArrangeByKey} from './bindArrangeByKey'
import {arrayMatcher, users} from '../utils'

const getBoundArrangeByKey = (newKey) => bindArrangeByKey(newKey)
const testAndVerifyDefaultResult = (testFunc) => {
    // default key='id' = ['1', '2', '3']
    arrayMatcher(Object.keys(testFunc(users)), ["1", "2", "3"])
}

describe('bindArrangeByKey', () => {
    it('can bind "name" as a key', () => {
        const arrangeByName = getBoundArrangeByKey('name')
        arrayMatcher(Object.keys(arrangeByName(users)), ["bob", "sally"])
    });

    it('will not bind empty key', () => {
        const arrangeByName = getBoundArrangeByKey('')

        // default key='id' = ['1', '2', '3']
        arrayMatcher(Object.keys(arrangeByName(users)), ["1", "2", "3"])
    });

    it('will not bind null/undefined key', () => {
        const arrangeByNull = getBoundArrangeByKey(null)
        testAndVerifyDefaultResult(arrangeByNull)

        const arrangeByUndef = getBoundArrangeByKey(undefined)
        testAndVerifyDefaultResult(arrangeByUndef)
    });

    it('will not bind non-string key', () => {
        const arrangeByBool = getBoundArrangeByKey(true)
        testAndVerifyDefaultResult(arrangeByBool)

        const arrangeByNumber = getBoundArrangeByKey(1)
        testAndVerifyDefaultResult(arrangeByNumber)

        const arrangeByObject = getBoundArrangeByKey({})
        testAndVerifyDefaultResult(arrangeByObject)
    });
})
