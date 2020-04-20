export const users = [{
    id: 1,
    name: 'bob'
}, {
    id: 2,
    name: 'sally'
}, {
    id: 3,
    name: 'bob',
    age: 30
}]

export const arrayMatcher = (receivedArr, expectedArr, same = true) => {
    if(same) {
        expect(receivedArr.length).toEqual(expectedArr.length)    
    }
    
    // same = true: expected array elements are present in received array
    // same = false: expected array elements are not present in received array
    expectedArr.forEach((a) => expect(receivedArr.includes(a)).toBe(same ? true : false))
}
