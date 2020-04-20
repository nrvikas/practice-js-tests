import {arrangeByKey} from './arrangeByKey'
import {arrayMatcher, users} from '../utils'


describe('arrangeByKey', () => {
    it('will use id as default key for indexes', () => {
        arrayMatcher(Object.keys(arrangeByKey(users)), ["1", "2", "3"])
    });

    it('will use provided parameter value as key for indexes when called with the parameter', () => {
        arrayMatcher(Object.keys(arrangeByKey(users, 'name')), ["bob", "sally"])
    });

    it('will have arrays for each attribute value in the transformed array', () => {
        const result = arrangeByKey(users, 'name')
        Object.keys(result).forEach((k) => expect(Array.isArray(result[k])).toBe(true));
    });

    it('will merge repeated elements in the input array', () => {
        const bobs = arrangeByKey(users, 'name')['bob']
        expect(bobs.length).toEqual(2)  // Has merged two 'bob' elements
        expect(bobs[0].id !== bobs[1].id).toBe(true)  // Two merged elements are different

        // Verify both bobs are present
        expect((bobs.filter((b) => b.age === 30 && b.id === 3 && b.name === 'bob').length)).toEqual(1)
        expect((bobs.filter((b) => b.id === 1 && b.name === 'bob').length)).toEqual(1)
    });

    it('will skip null or empty elements in the input array', () => {
        const nullUsersIncluded = [
            ...users,
            null,
            undefined,
            null,
            undefined,
        ]

        const resultIndexes = Object.keys(arrangeByKey(nullUsersIncluded))
        arrayMatcher(resultIndexes, ["1", "2", "3"])  // Only non null/empty values are present

        arrayMatcher(resultIndexes, [null, undefined], false)  // null/undefined values doesn't exist
    });

    it('will skip elements which are not objects in the input array', () => {
        const nullUsersIncluded = [
            ...users,
            1,  // number
            true,  // boolean
            () => {},  // function
        ]

        const resultIndexes = Object.keys(arrangeByKey(nullUsersIncluded))
        arrayMatcher(resultIndexes, ["1", "2", "3"])  // Only object values are present
        arrayMatcher(resultIndexes, [1, undefined, true], false)  // Non-object values doesn't exist
    });

    it('does not mutate the input array', () => {
        const usersReferentialEqual = users
        arrangeByKey(users)
        expect(users).toBe(usersReferentialEqual)  // Object equality

        // Every individual object is same and not mutated
        users.forEach((u, index) => expect(users[index]).toBe(usersReferentialEqual[index]))
    });

    it('ignores elements without given key', () => {
        // Empty result
        let result = arrangeByKey(users, 'unknownKey')
        expect(Object.keys(result).length).toEqual(0)

        // Only 1 bob has age (30), so result should have just 1 element
        result = arrangeByKey(users, 'age')
        arrayMatcher(Object.keys(result), ["30"])

        // Make sure it is the only bob with age:30
        expect(result["30"]).toEqual([{
            age: 30,
            id: 3,
            name: "bob"
        }])

    });
})
